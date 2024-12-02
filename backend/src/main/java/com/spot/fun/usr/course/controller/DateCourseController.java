package com.spot.fun.usr.course.controller;

import com.spot.fun.usr.course.model.DateCourse;
import com.spot.fun.usr.course.service.DateCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/usr/course/datecourses")
public class DateCourseController {

    @Autowired
    private DateCourseService dateCourseService;

    @GetMapping("/fixed")
    public List<DateCourse> getFixedDateCourses() {
        return dateCourseService.getFixedDateCourses();
    }

    @PostMapping("/fixed")
    public DateCourse addFixedDateCourse(@RequestPart("dateCourse") DateCourse dateCourse,
                                         @RequestPart("image") MultipartFile image) throws IOException {
        dateCourse.setFixed(true); // 고정된 코스 설정
        return dateCourseService.saveDateCourse(dateCourse, image);
    }
}
