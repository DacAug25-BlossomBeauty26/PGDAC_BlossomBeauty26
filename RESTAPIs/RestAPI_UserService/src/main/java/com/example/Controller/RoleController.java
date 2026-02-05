package com.example.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Entities.Role;
import com.example.Repository.RoleRepo;

@RestController
//@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class RoleController {

    @Autowired
    private RoleRepo roleRepository;

    @GetMapping("/getroles")
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}

