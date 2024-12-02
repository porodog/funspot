package com.spot.fun.usr.course.repository;

import com.spot.fun.usr.course.model.DateCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DateCourseRepository extends JpaRepository<DateCourse, Long> {
    List<DateCourse> findByLocationOrAgeGroup(String location, int ageGroup);
    List<DateCourse> findByFixed(boolean fixed); // 고정된 코스를 조회
//    List<DateCourse> findByAddDate(String description, String imageUrl, String difficulty, List<String> options);
}
