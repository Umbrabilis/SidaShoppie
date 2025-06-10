package com.example.sidashoppie.service;

import com.example.sidashoppie.io.CategoryRequest;
import com.example.sidashoppie.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {
    CategoryResponse addCategory(CategoryRequest request, MultipartFile file);
    List<CategoryResponse> read();

    void delete(String categoryId);
}
