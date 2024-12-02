package com.spot.fun.usr.course.service;

import com.spot.fun.usr.course.model.DateCourse;
import com.spot.fun.usr.course.repository.DateCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class DateCourseService {
    @Autowired
    private DateCourseRepository repository;

    private final Path root = Paths.get("uploads");

    public List<DateCourse> getDateCourses(String location, int ageGroup) {
        return repository.findByLocationOrAgeGroup(location, ageGroup);
    }

    public List<DateCourse> getFixedDateCourses() {
        return repository.findByFixed(true);
    }

    public DateCourse saveDateCourse(DateCourse dateCourse, MultipartFile image) throws IOException {
        if (!Files.exists(root)) {
            Files.createDirectories(root);
        }

        if (image != null && !image.isEmpty()) {
            String fileName = image.getOriginalFilename();
            Path filePath = root.resolve(fileName);
            Files.copy(image.getInputStream(), filePath);
            dateCourse.setImageUrl(filePath.toString());
        }

        return repository.save(dateCourse);
    }
}
