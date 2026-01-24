package com.example.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Entities.City;
import com.example.Repository.CityRepo;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/cities")
public class CityController {

    @Autowired
    private CityRepo cityRepository;

    @GetMapping
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }
}

