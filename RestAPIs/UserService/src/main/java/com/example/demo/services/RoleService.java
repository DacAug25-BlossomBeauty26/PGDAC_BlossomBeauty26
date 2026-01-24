package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Role;
import com.example.demo.repositories.RoleRepo;

@Service
public class RoleService {
	@Autowired
	RoleRepo rrepo;
	
	public List<Role> getAllRoles(){
		return rrepo.findAll();
	}
}
