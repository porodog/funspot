package com.spot.fun.usr.course.controller;

import com.spot.fun.usr.course.model.DatePlaces;
import com.spot.fun.usr.course.service.PlacesService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/usr/places")
public class PlacesController {

  @Autowired
  private PlacesService placesService;

  // 모든 사용자(비회원 포함)가 장소 데이터를 조회할 수 있도록 수정
  @GetMapping("")
  public ResponseEntity<List<DatePlaces>> getAllPlaces() {
    try {
      // 장소 데이터 가져오기
      List<DatePlaces> datePlaces = placesService.getAllPlaces();
      if (datePlaces == null || datePlaces.isEmpty()) {
        log.info("장소 데이터가 없습니다.");
//        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("장소 데이터가 없습니다.");
        return ResponseEntity.ok(Collections.emptyList()); // 빈 리스트 반환
      }

      // 성공적으로 장소 데이터를 반환
      return ResponseEntity.ok(datePlaces);
    } catch (Exception e) {
      // 예외 로깅 및 500 상태 반환
      log.error("장소 데이터 가져오기 실패: {}", e.getMessage());
      return ResponseEntity.ok(Collections.emptyList()); // 빈 리스트 반환
    }
  }

  // 장소 추가 (관리자 또는 인증된 사용자만 접근 가능하도록 할 수 있음)
  @PostMapping
  public ResponseEntity<?> addPlace(@RequestBody DatePlaces place) {
    try {
      DatePlaces savedPlace = placesService.savePlace(place);
      return ResponseEntity.status(HttpStatus.CREATED).body(savedPlace);
    } catch (Exception e) {
      log.error("장소 추가 실패: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("장소 추가 중 문제가 발생했습니다.");
    }
  }

  @GetMapping("/{courseId}")
  public ResponseEntity<List<DatePlaces>> getPlacesByCourseId(@PathVariable Long courseId) {
    List<DatePlaces> places = placesService.findPlacesByCourseId(courseId);
    return ResponseEntity.ok(places);
  }
}

