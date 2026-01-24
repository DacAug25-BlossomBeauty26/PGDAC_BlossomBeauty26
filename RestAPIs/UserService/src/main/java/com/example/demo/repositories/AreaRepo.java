package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Area;

@Repository
public interface AreaRepo extends JpaRepository<Area, Integer> {

}
