package com.example.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Entities.Role;
import com.example.Repository.RoleRepo;

@Service
public class RoleService {
	@Autowired
	RoleRepo rrepo;
	
	public List<Role> getAllRoles(){
		return rrepo.findAll();
	}
}

