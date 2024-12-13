package com.spot.fun.usr.course.service;

import com.spot.fun.usr.course.model.DateCourse;
import com.spot.fun.usr.course.repository.DateCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DateCourseService {

    private final DateCourseRepository dateCourseRepository;

    @Autowired
    public DateCourseService(DateCourseRepository dateCourseRepository) {
        this.dateCourseRepository = dateCourseRepository;
    }

    // 코스 추가
    public DateCourse addCourse(DateCourse dateCourse) {
        return dateCourseRepository.save(dateCourse);
    }

    // 코스 정보 조회
    public Optional<DateCourse> getCourseById(Long id) {
        return dateCourseRepository.findById(id);
    }

    // 모든 코스 목록 조회
    public List<DateCourse> getAllCourses() {
        return dateCourseRepository.findAll();
    }

    // 지도 경로 제공 (예시로, 경도와 위도 반환)
    public String getMapRoute(Long id) {
        Optional<DateCourse> course = dateCourseRepository.findById(id);
        if (course.isPresent()) {
            DateCourse dateCourse = course.get();
            return "위도: " + dateCourse.getLatitude() + ", 경도: " + dateCourse.getLongitude();
        }
        return "코스를 찾을 수 없습니다.";
    }
}
