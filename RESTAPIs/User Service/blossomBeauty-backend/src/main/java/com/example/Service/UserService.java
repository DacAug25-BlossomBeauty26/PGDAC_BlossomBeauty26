package com.example.Service;

import com.example.DTO.LoginDTO;
import com.example.DTO.LoginResponseDTO;
import com.example.DTO.UserRegisterDTO;
import com.example.DTO.UserResponseDTO;


public interface UserService {

    UserResponseDTO registerUser(UserRegisterDTO dto);
    LoginResponseDTO loginUser(LoginDTO dto);
    
}