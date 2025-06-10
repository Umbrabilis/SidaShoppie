package com.example.sidashoppie.service;

import com.example.sidashoppie.io.ItemRequest;
import com.example.sidashoppie.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file);
    List<ItemResponse> fetchItems();
    void deleteItem(String itemId);
}
