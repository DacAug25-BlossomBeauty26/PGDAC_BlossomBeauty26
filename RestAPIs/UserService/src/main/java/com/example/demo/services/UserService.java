package com.example.demo.services;



import com.example.demo.dto.LoginDTO;
import com.example.demo.dto.LoginResponseDTO;
import com.example.demo.dto.UserRegisterDTO;
import com.example.demo.dto.userResponseDTO;


public interface UserService {

    userResponseDTO registerUser(UserRegisterDTO dto);
    LoginResponseDTO loginUser(LoginDTO dto);
    
}
