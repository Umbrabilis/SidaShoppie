package com.example.sidashoppie.service;

import com.example.sidashoppie.io.UserRequest;
import com.example.sidashoppie.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}
