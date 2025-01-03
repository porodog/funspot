package com.spot.fun.usr.course.service;//package com.spot.fun.usr.course.service;

import com.spot.fun.usr.course.dto.DateCourseDTO;
import com.spot.fun.usr.course.dto.DatePlacesDTO;
import com.spot.fun.usr.course.model.DateCourse;
import com.spot.fun.usr.course.model.DatePlaces;
import com.spot.fun.usr.course.repository.DateCourseRepository;
import com.spot.fun.usr.course.repository.DatePlaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;



@Log4j2
@Service

@RequiredArgsConstructor
public class DateCourseService {

  private final DateCourseRepository dateCourseRepository;
  private final DatePlaceRepository datePlaceRepository;

  // 코스 추가


  // 코스 정보 조회
  public Optional<DateCourse> getCourseById(Long id) {
    return dateCourseRepository.findWithPlacesById(id);
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
    }
    return "코스를 찾을 수 없습니다.";
  }

  public DateCourseDTO getCourseWithPlaces(Long id) {
    DateCourse course = dateCourseRepository.findWithPlacesById(id)
            .orElseThrow(() -> new IllegalArgumentException("Course not found"));

    List<DatePlacesDTO> places = course.getPlaces().stream()
            .map(place -> new DatePlacesDTO(
                    place.getId(),
                    place.getName(),
                    place.getDescription(),
                    place.getLatitude(),
                    place.getLongitude(),
                    place.getCost(),
                    place.getTime(),
                    place.getImage()
            ))
            .toList();

    return new DateCourseDTO(
            course.getId(),
            course.getName(),
            course.getDescription(),
            course.getAgeGroup(),
            course.isFixed(),
            course.getLocation(),
            places
    );
  }





  public DateCourse addCourse(DateCourseDTO dateCourseDTO) {
    // 1. 장소 ID 추출
    List<Long> placeIds = dateCourseDTO.getPlaces()
            .stream()
            .map(DatePlacesDTO::getId)
            .collect(Collectors.toList());

    // 2. 장소 데이터베이스 조회
    List<DatePlaces> selectedPlaces = datePlaceRepository.findAllById(placeIds);
    if (selectedPlaces.isEmpty()) {
      throw new IllegalArgumentException("선택한 장소가 유효하지 않습니다.");
    }

    // 3. DateCourse 엔티티 생성
    DateCourse dateCourse = new DateCourse();
    dateCourse.setName(dateCourseDTO.getName());
    dateCourse.setDescription(dateCourseDTO.getDescription());
    dateCourse.setAgeGroup(dateCourseDTO.getAgeGroup());
    dateCourse.setFixed(dateCourseDTO.isFixed());
    dateCourse.setLocation(dateCourseDTO.getLocation());

    // 4. 장소와 코스 연결
    for (DatePlaces place : selectedPlaces) {
      place.setCourse(dateCourse);
    }
    dateCourse.setPlaces(selectedPlaces);

    // 5. 코스 저장
    return dateCourseRepository.save(dateCourse);
  }
}

