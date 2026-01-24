package com.example.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Entities.Role;
import com.example.Repository.RoleRepo;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleRepo roleRepository;

    @GetMapping
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}

