package com.example.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.DTO.LoginDTO;
import com.example.DTO.LoginResponseDTO;
import com.example.DTO.UserRegisterDTO;
import com.example.DTO.UserResponseDTO;
import com.example.Entities.Area;
import com.example.Entities.Role;
import com.example.Entities.User;
import com.example.Repository.AreaRepo;
import com.example.Repository.RoleRepo;
import com.example.Repository.UserRepo;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private RoleRepo roleRepository;

    @Autowired
    private AreaRepo areaRepository;
    
    @Override
    public UserResponseDTO registerUser(UserRegisterDTO dto) {

        // 1) check if role exists
  
    	Role defaultRole = roleRepository.findByRoleName("CUSTOMER")
    			.orElseThrow(() -> new RuntimeException("Default role not found"));
    			

        // 2) check if area exists
        Area area = areaRepository.findById(dto.getAreaId())
                .orElseThrow(() -> new RuntimeException("Area not found"));

        // 3) create user entity
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setFirstName(dto.getFirstName());   
        user.setLastName(dto.getLastName());     
        user.setContact(dto.getContact());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setRole(defaultRole);
        user.setArea(area);
        //user.setCreatedAt(LocalDateTime.now());
        user.setStatus(User.Status.ACTIVE);

        // 4) save user
        User savedUser = userRepository.save(user);

        // 5) response
        UserResponseDTO response = new UserResponseDTO();
        response.setId(savedUser.getId());
        response.setUsername(savedUser.getUsername());
        response.setFirstName(savedUser.getFirstName());  
        response.setLastName(savedUser.getLastName());     
        response.setEmail(savedUser.getEmail());
        response.setContact(savedUser.getContact());
        response.setRoleName(savedUser.getRole().getRoleName());
        response.setAreaName(savedUser.getArea().getAreaName());
        response.setStatus(savedUser.getStatus().name());
        

        return response;
    }

    @Override
    public LoginResponseDTO loginUser(LoginDTO dto) {

        // 1) Check if user exists by email
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // 2) Verify password
        if (!user.getPassword().equals(dto.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // 3) Check user status
        if (user.getStatus() == User.Status.BLOCKED) {
            throw new RuntimeException("Your account is blocked");
        }

        // 4) Create response
        LoginResponseDTO response = new LoginResponseDTO();
        response.setUserId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().getRoleName());
        response.setArea(user.getArea().getAreaName());
        response.setStatus(LoginResponseDTO.Status.valueOf(user.getStatus().name()));

        response.setMessage("Login Successfully");
        

        return response;
    }
    
    @Override
    public UserResponseDTO getUserById(Long userId) {

        // 1) Fetch user by ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // 2) Map entity → DTO (exclude password)
        UserResponseDTO response = new UserResponseDTO();
      
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());
        response.setContact(user.getContact());
        response.setRoleName(user.getRole().getRoleName());
        response.setAreaName(user.getArea().getAreaName());
        response.setStatus(user.getStatus().name());

        return response;
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {

        List<User> users = userRepository.findAll();

        return users.stream().map(user -> {

            UserResponseDTO dto = new UserResponseDTO();

            dto.setId(user.getId());
            dto.setUsername(user.getUsername());
            dto.setFirstName(user.getFirstName());
            dto.setLastName(user.getLastName());
            dto.setEmail(user.getEmail());
            dto.setContact(user.getContact());
            dto.setRoleName(user.getRole().getRoleName());
            dto.setAreaName(user.getArea().getAreaName());
            dto.setStatus(user.getStatus().name());

            return dto;

        }).toList();
    }
    @Override
    public UserResponseDTO updateUserStatus(Long userId, String status) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Convert String to Enum
        user.setStatus(User.Status.valueOf(status.toUpperCase()));

        User updatedUser = userRepository.save(user);

        UserResponseDTO dto = new UserResponseDTO();

        dto.setId(updatedUser.getId());
        dto.setUsername(updatedUser.getUsername());
        dto.setFirstName(updatedUser.getFirstName());
        dto.setLastName(updatedUser.getLastName());
        dto.setEmail(updatedUser.getEmail());
        dto.setContact(updatedUser.getContact());
        dto.setRoleName(updatedUser.getRole().getRoleName());
        dto.setAreaName(updatedUser.getArea().getAreaName());
        dto.setStatus(updatedUser.getStatus().name());

        return dto;
    }

}
