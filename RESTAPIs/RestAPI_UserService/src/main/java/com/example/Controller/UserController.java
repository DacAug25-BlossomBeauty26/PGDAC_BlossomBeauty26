package com.example.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.DTO.LoginDTO;
import com.example.DTO.LoginResponseDTO;
import com.example.DTO.UserRegisterDTO;
import com.example.DTO.UserResponseDTO;
import com.example.Service.UserService;
import java.util.List;

@RestController


@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
 
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> registerUser(@RequestBody UserRegisterDTO dto) {
        UserResponseDTO response = userService.registerUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }
    

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody LoginDTO dto) {
        return ResponseEntity.ok(userService.loginUser(dto));
    }

   
    @GetMapping("/getbyuserid/{userId}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long userId) {
        UserResponseDTO response = userService.getUserById(userId);
        return ResponseEntity.ok(response);
    }
   
    @GetMapping("/admin/getallusers")
    public List<UserResponseDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    //  UPDATE USER STATUS
    @PutMapping("/admin/updateuserstatus/{userId}")
    public UserResponseDTO updateUserStatus(
            @PathVariable Long userId,
            @RequestParam String status
    ) {
        return userService.updateUserStatus(userId, status);
    }

}

