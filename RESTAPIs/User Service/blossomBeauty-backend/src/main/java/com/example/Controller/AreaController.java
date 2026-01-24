package com.example.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.Entities.Area;
import com.example.Repository.AreaRepo;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/areas")
public class AreaController {

    @Autowired
    private AreaRepo areaRepository;

   
    @GetMapping
    public List<Area> getAllAreas() {
        return areaRepository.findAll();
    }

    // Get areas by cityId
    @GetMapping("/{cityId}")
    public List<Area> getAreasByCity(@PathVariable Integer cityId) {
        return areaRepository.findByCity_CityId(cityId);
    }
}
