package com.example.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Entities.City;
import com.example.Repository.CityRepo;

@Service
public class CityService {
	@Autowired
	CityRepo crepo;
	
	public List<City> getAllCities(){
		return crepo.findAll();
	}
}

