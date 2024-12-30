package com.spot.fun.usr.course.controller;//package com.spot.fun.usr.course.controller;

import com.spot.fun.token.util.AuthTokenUtil;
import com.spot.fun.usr.course.dto.DateCourseDTO;
import com.spot.fun.usr.course.dto.DatePlacesDTO;
import com.spot.fun.usr.course.model.DateCourse;
import com.spot.fun.usr.course.model.DatePlaces;
import com.spot.fun.usr.course.service.DateCourseService;
import com.spot.fun.usr.course.service.PlacesService;
import com.spot.fun.usr.user.dto.UserDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/usr/course")
public class DateCourseController {

    private final DateCourseService dateCourseService;
    private final PlacesService placesService;
    private final AuthTokenUtil authTokenUtil;

    // 코스 추가
    @PostMapping("/addcourse")
    @PreAuthorize("hasRole('ADMIN')") // ROLE_ADMIN만 접근 가능
    public ResponseEntity<String> addCourse(@RequestBody DateCourseDTO dateCourseDTO) {
        dateCourseService.addCourse(dateCourseDTO);
        return ResponseEntity.ok("Course added successfully");
    }

    @GetMapping("datecourses/{id}")
    public ResponseEntity<DateCourseDTO> getCourseWithPlaces(@PathVariable Long courseId) {
        DateCourseDTO courseDTO = dateCourseService.getCourseWithPlaces(courseId);
        return ResponseEntity.ok(courseDTO);
    }

    // 특정 코스 조회 + 장소 데이터 포함
//    @GetMapping("/datecourses/{id}")
//    public ResponseEntity<?> getCourseWithPlaceIds(@PathVariable("id") Long id) {
//        try {
//            // 코스 데이터 조회
//            Optional<DateCourse> courseOptional = dateCourseService.getCourseById(id);
//
//            if (courseOptional.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 ID의 코스를 찾을 수 없습니다.");
//            }
//
//            Map<String, Object> response = getStringObjectMap(courseOptional);
//
//            return ResponseEntity.ok(response);
//
//        } catch (Exception e) {
//            log.error("코스 조회 중 오류 발생: {}", e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터를 불러오는 중 문제가 발생했습니다.");
//        }
//    }

    private static Map<String, Object> getStringObjectMap(Optional<DateCourse> courseOptional) {
        DateCourse course = courseOptional.get();

        // 장소 ID 가져오기
//            List<Long> placeIds = course.getPlaceIds();
        List<DatePlaces> places = new ArrayList<>();

//            if (placeIds != null && !placeIds.isEmpty()) {
//                places = placesService.getPlacesByIds(placeIds);
//            }

        // JSON 응답 생성
        Map<String, Object> response = new HashMap<>();
        response.put("id", course.getId());
        response.put("name", course.getName());
        response.put("description", course.getDescription());
//            response.put("placeIds", placeIds);
        response.put("places", places);
        return response;
    }


    // 모든 코스 목록 조회
    @GetMapping("/datecourses")
    public ResponseEntity<List<DateCourse>> getPagedCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<DateCourse> courses = dateCourseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    // 특정 코스의 지도 경로 조회
    @GetMapping("/{id}/map")
    public ResponseEntity<String> getMapRoute(@PathVariable Long id, HttpServletRequest request) {
        if (!authTokenUtil.validateAccessToken(request)) {
            log.error("Invalid or expired access token.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 토큰이 유효하지 않습니다.");
        }

        String mapRoute = dateCourseService.getMapRoute(id);
        return ResponseEntity.ok(mapRoute);
    }

    // 검색 및 필터링
    @GetMapping("/datecourses/search")
    public ResponseEntity<List<DateCourse>> searchCourses(@RequestParam String keyword) {
        List<DateCourse> courses = dateCourseService.searchCourses(keyword);
        return ResponseEntity.ok(courses);
    }
}


