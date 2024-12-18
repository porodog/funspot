package com.spot.fun.usr.course.controller;

import com.spot.fun.usr.course.model.DatePlaces;
import com.spot.fun.usr.course.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


import java.util.List;

@RestController
@RequestMapping("/api/usr/places")
public class PlacesController {
  @Autowired
  private PlaceService placeService;

  @PostMapping
  public DatePlaces addPlace(@RequestBody DatePlaces place) {
    return placeService.savePlace(place);
  }

  @GetMapping
  public List<DatePlaces> getPlaces(
          @RequestParam Double latMin,
          @RequestParam Double latMax,
          @RequestParam Double lngMin,
          @RequestParam Double lngMax) {
    return placeService.getPlaces(latMin, latMax, lngMin, lngMax);
  }
}
