package com.example.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Entities.Role;

@Repository
public interface RoleRepo extends JpaRepository<Role, Integer> {
	Optional<Role> findByRoleName(String roleName);
}

