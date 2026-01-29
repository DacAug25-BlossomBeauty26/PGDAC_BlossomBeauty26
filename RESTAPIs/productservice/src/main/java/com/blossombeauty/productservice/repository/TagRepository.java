package com.blossombeauty.productservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blossombeauty.productservice.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Integer> {

}
