package com.spot.fun.usr.course.service;

import com.spot.fun.usr.course.model.DatePlaces;
import com.spot.fun.usr.course.repository.DatePlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceService {
  @Autowired
  private DatePlaceRepository datePlaceRepository;

  public DatePlaces savePlace(DatePlaces place) {
    return datePlaceRepository.save(place);
  }

  public List<DatePlaces> getPlaces(Double latMin, Double latMax, Double lngMin, Double lngMax) {
    return datePlaceRepository.findByLatitudeBetweenAndLongitudeBetween(latMin, latMax, lngMin, lngMax);
  }
}
