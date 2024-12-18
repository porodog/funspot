package com.spot.fun.usr.course.repository;

import com.spot.fun.usr.course.model.DatePlaces;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DatePlaceRepository extends JpaRepository<DatePlaces, Long> {
  List<DatePlaces> findByLatitudeBetweenAndLongitudeBetween(
          Double latMin, Double latMax, Double lngMin, Double lngMax);
}
