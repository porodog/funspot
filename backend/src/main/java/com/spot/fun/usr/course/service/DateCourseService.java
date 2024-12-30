package com.spot.fun.usr.course.service;//package com.spot.fun.usr.course.service;

import com.spot.fun.usr.course.dto.DateCourseDTO;
import com.spot.fun.usr.course.dto.DatePlacesDTO;
import com.spot.fun.usr.course.model.DateCourse;
import com.spot.fun.usr.course.model.DatePlaces;
import com.spot.fun.usr.course.repository.DateCourseRepository;
import com.spot.fun.usr.course.repository.DatePlaceRepository;
import com.spot.fun.usr.custom.repository.PlaceRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;



@Log4j2
@Service
public class DateCourseService {

    private final DateCourseRepository dateCourseRepository;
    private final DatePlaceRepository datePlaceRepository;

    @Autowired
    public DateCourseService(DateCourseRepository dateCourseRepository, DatePlaceRepository datePlaceRepository) {
        this.dateCourseRepository = dateCourseRepository;
        this.datePlaceRepository = datePlaceRepository;
    }

    // 코스 추가
    @Transactional
    public void addCourse(DateCourseDTO dateCourseDTO) {
        // 1. DTO에서 장소 ID 추출
        List<Long> ids = dateCourseDTO.getPlaces()
                .stream()
                .map(DatePlacesDTO::getId) // DTO에서 ID 추출
                .collect(Collectors.toList());

        // 2. ID로 장소 데이터 조회 (DatePlaceRepository 사용)
        List<DatePlaces> selectedPlaces = datePlaceRepository.findAllById(ids);

        // 3. 새로운 DateCourse 엔티티 생성
        DateCourse dateCourse = new DateCourse();
        dateCourse.setName(dateCourseDTO.getName());
        dateCourse.setDescription(dateCourseDTO.getDescription());
        dateCourse.setAgeGroup(dateCourseDTO.getAgeGroup());
        dateCourse.setFixed(dateCourseDTO.isFixed());
        dateCourse.setLocation(dateCourseDTO.getLocation());

        // 4. 코스와 장소 연결
        for (DatePlaces place : selectedPlaces) {
            place.setCourse(dateCourse); // 장소와 코스 관계 설정
        }
        dateCourse.setPlaces(selectedPlaces);

        // 5. 저장
        dateCourseRepository.save(dateCourse); // 코스와 장소 저장
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

    @Transactional(readOnly = true)
    public DateCourseDTO getCourseWithPlaces(Long courseId) {
        DateCourse course = dateCourseRepository.findWithPlacesById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("해당 코스를 찾을 수 없습니다."));

        List<DatePlacesDTO> placesDTO = course.getPlaces().stream()
                .map(place -> new DatePlacesDTO(
                        place.getId(),
                        place.getName(),
                        place.getDescription(),
                        place.getLatitude(),
                        place.getLongitude(),
                        place.getCost(),
                        place.getTime()
                ))
                .collect(Collectors.toList());

        return new DateCourseDTO(
                course.getId(),
                course.getName(),
                course.getDescription(),
                course.getAgeGroup(),
                course.isFixed(),
                course.getLocation(),
                placesDTO
        );
    }



//    public Optional<DateCourse> getCourseWithPlaceIds(Long id) {
//        return dateCourseRepository.findById(id).map(course -> {
//            List<Long> placeIds = course.getPlaces()
//                    .stream()
//                    .map(DatePlaces::getId)
//                    .collect(Collectors.toList());
//            course.setPlaceIds(placeIds);
//            return course;
//        });
//    }


    public Page<DateCourse> getPagedCourses(int page, int size) {
        return null;
    }

    public List<DateCourse> searchCourses(String keyword) {
        return null;
    }
}
//
//import com.spot.fun.usr.course.dto.DateCourseDTO;
//import com.spot.fun.usr.course.dto.DatePlacesDTO;
//import com.spot.fun.usr.course.model.DateCourse;
//import com.spot.fun.usr.course.repository.DateCourseRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class DateCourseService {
//
//    private final DateCourseRepository dateCourseRepository;
//
//    public DateCourseDTO getCourseWithPlaces(Long courseId) {
//        DateCourse course = dateCourseRepository.findById(courseId)
//                .orElseThrow(() -> new RuntimeException("Course not found"));
//
//        List<DatePlacesDTO> placesDTO = course.getPlaces().stream()
//                .map(place -> new DatePlacesDTO(
//                        place.getId(),
//                        place.getName(),
//                        place.getDescription(),
//                        place.getLatitude(),
//                        place.getLongitude(),
//                        place.getCost(),
//                        place.getTime()
//                )).toList();
//
//        return new DateCourseDTO(
//                course.getId(),
//                course.getName(),
//                course.getLocation(),
//                course.getDescription(),
//                course.getAgeGroup(),
//                placesDTO
//        );
//    }
//}
