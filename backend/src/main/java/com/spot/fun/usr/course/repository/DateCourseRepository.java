package com.spot.fun.usr.course.repository;

import com.spot.fun.usr.course.model.DateCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface DateCourseRepository extends JpaRepository<DateCourse, Long> {
  Optional<DateCourse> findById(Long id); // ID로 코스 조회


  // 위도, 경도를 기준으로 범위 내 코스 검색
  @Query("SELECT c FROM DateCourse c WHERE ABS(c.latitude - :latitude) < :range AND ABS(c.longitude - :longitude) < :range")
  List<DateCourse> findCoursesByLocationWithinRange(double latitude, double longitude, double range);
}
