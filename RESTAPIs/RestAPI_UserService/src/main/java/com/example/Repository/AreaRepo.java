package com.example.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Entities.Area;

@Repository
public interface AreaRepo extends JpaRepository<Area, Integer> {
	List<Area> findByCity_CityId(int cityId);
}
