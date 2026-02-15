package com.example.Service;

import java.util.List;

import com.example.DTO.LoginDTO;
import com.example.DTO.LoginResponseDTO;
import com.example.DTO.UserRegisterDTO;
import com.example.DTO.UserResponseDTO;


public interface UserService {

    UserResponseDTO registerUser(UserRegisterDTO dto);
    LoginResponseDTO loginUser(LoginDTO dto);
    UserResponseDTO getUserById(Long userId);
    List<UserResponseDTO> getAllUsers();
    UserResponseDTO updateUserStatus(Long userId, String status);

    
}