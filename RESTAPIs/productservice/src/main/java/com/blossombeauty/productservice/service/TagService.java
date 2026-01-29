package com.blossombeauty.productservice.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.blossombeauty.productservice.entity.Tag;
import com.blossombeauty.productservice.repository.TagRepository;

@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public Tag addTag(Tag tag) {
        return tagRepository.save(tag);
    }

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Optional<Tag> getTagById(Integer id) {
        return tagRepository.findById(id);
    }

    public Tag updateTag(Tag tag) {
        return tagRepository.save(tag);
    }

    public void deleteTag(Integer id) {
        tagRepository.deleteById(id);
    }
}
