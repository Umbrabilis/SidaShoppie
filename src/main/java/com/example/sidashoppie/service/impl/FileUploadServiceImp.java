package com.example.sidashoppie.service.impl;

import com.example.sidashoppie.config.SupabaseConfig;
import com.example.sidashoppie.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileUploadServiceImp implements FileUploadService {

    private final OkHttpClient client;
    private final SupabaseConfig supabaseConfig;

    @Override
    public String uploadFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("El archivo está vacío o es nulo");
        }

        String filenameExtension = getExtension(file.getOriginalFilename());
        String key = UUID.randomUUID() + "." + filenameExtension;

        try {
            // Crear RequestBody con el contenido del archivo
            RequestBody fileBody = RequestBody.create(
                    MediaType.parse(file.getContentType()),
                    file.getBytes()
            );

            // URL corregida para Supabase Storage
            String uploadUrl = supabaseConfig.getStorageUrl() + "/object/" + supabaseConfig.getBucketName() + "/" + key;

            Request request = new Request.Builder()
                    .url(uploadUrl)
                    .post(fileBody)
                    .addHeader("Authorization", "Bearer " + supabaseConfig.getAnonKey()) // CAMBIO: usar anon key
                    .addHeader("apikey", supabaseConfig.getAnonKey()) // CAMBIO: usar anon key
                    .addHeader("Content-Type", file.getContentType())
                    .addHeader("x-upsert", "true") // Permite sobrescribir si existe
                    .build();

            try (Response response = client.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    String responseBody = response.body() != null ? response.body().string() : "Sin detalles";
                    throw new IOException("Error al subir archivo: " + response.code() + " - " + responseBody);
                }

                // URL pública correcta
                String baseUrl = supabaseConfig.getStorageUrl().replace("/storage/v1", "");
                return baseUrl + "/storage/v1/object/public/" + supabaseConfig.getBucketName() + "/" + key;
            }
        } catch (IOException e) {
            throw new RuntimeException("Error al procesar el archivo: " + e.getMessage(), e);
        }
    }

    @Override
    public boolean deleteFile(String imgUrl) {
        if (imgUrl == null || imgUrl.isEmpty()) {
            return false;
        }

        try {
            String key = extractKeyFromUrl(imgUrl);

            Request request = new Request.Builder()
                    .url(supabaseConfig.getStorageUrl() + "/object/" + supabaseConfig.getBucketName() + "/" + key)
                    .delete()
                    .addHeader("Authorization", "Bearer " + supabaseConfig.getAnonKey()) // CAMBIO: usar anon key
                    .addHeader("apikey", supabaseConfig.getAnonKey()) // CAMBIO: usar anon key
                    .build();

            try (Response response = client.newCall(request).execute()) {
                return response.isSuccessful();
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar el archivo: " + e.getMessage(), e);
        }
    }

    private String getExtension(String filename) {
        if (filename == null || filename.lastIndexOf(".") == -1) {
            return "";
        }
        return filename.substring(filename.lastIndexOf(".") + 1);
    }

    private String extractKeyFromUrl(String url) {
        if (url.contains("/object/public/")) {
            String[] parts = url.split("/object/public/" + supabaseConfig.getBucketName() + "/");
            return parts.length > 1 ? parts[1] : url.substring(url.lastIndexOf("/") + 1);
        }
        return url.substring(url.lastIndexOf("/") + 1);
    }
}