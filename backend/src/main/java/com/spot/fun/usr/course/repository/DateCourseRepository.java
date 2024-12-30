package com.spot.fun.usr.course.repository;

import com.spot.fun.usr.course.model.DateCourse;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface DateCourseRepository extends JpaRepository<DateCourse, Long> {
  @Query("SELECT dc FROM DateCourse dc JOIN FETCH dc.places WHERE dc.id = :id")
  Optional<DateCourse> findWithPlacesById(@Param("id") Long id);

}
