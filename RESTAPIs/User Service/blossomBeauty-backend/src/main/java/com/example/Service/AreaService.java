package com.example.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Entities.Area;
import com.example.Repository.AreaRepo;

@Service
public class AreaService {
	@Autowired
	AreaRepo arepo;
	
	public List<Area> getAllAreas(){
		return arepo.findAll();
	}
}
