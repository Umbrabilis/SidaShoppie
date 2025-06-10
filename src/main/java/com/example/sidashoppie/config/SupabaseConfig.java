package com.example.sidashoppie.config;

import lombok.Getter;
import okhttp3.OkHttpClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
@Getter
public class SupabaseConfig {

    @Value("${supabase.storage.url}")
    private String storageUrl;

    @Value("${supabase.anon.key}")
    private String anonKey;

    @Value("${supabase.service.role.key:}") // NUEVA PROPIEDAD NECESARIA
    private String serviceRoleKey;

    @Value("${supabase.bucket.name}")
    private String bucketName;

    @Bean
    public OkHttpClient client() {
        return new OkHttpClient.Builder()
                .connectTimeout(Duration.ofSeconds(30))
                .readTimeout(Duration.ofSeconds(60)) // Aumentado para uploads
                .writeTimeout(Duration.ofSeconds(60)) // Aumentado para uploads
                .build();
    }
}