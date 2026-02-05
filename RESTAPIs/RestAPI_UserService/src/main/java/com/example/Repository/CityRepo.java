package com.example.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.example.Entities.City;

@Repository
public interface CityRepo extends JpaRepository<City, Integer> {

}
