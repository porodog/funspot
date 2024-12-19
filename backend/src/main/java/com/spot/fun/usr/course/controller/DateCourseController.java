package com.spot.fun.usr.course.controller;

import com.spot.fun.token.util.AuthTokenUtil;
import com.spot.fun.usr.course.model.DateCourse;
import com.spot.fun.usr.course.service.DateCourseService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/usr/course")
public class DateCourseController {

    private final DateCourseService dateCourseService;
    private final AuthTokenUtil authTokenUtil;

    // 코스 추가
    @PostMapping("/addcourse")
    public ResponseEntity<DateCourse> addCourse(@RequestBody DateCourse dateCourse,
                                                HttpServletRequest request) {
        // 인증된 사용자만 코스를 추가할 수 있도록 처리
        if (!authTokenUtil.validateAccessToken(request)) {
            return ResponseEntity.status(401).body(null);
        }

            DateCourse createdCourse = dateCourseService.addCourse(dateCourse);
        return ResponseEntity.ok(createdCourse);
    }

    // 특정 코스 조회
    @GetMapping("/{id}")
    public ResponseEntity<DateCourse> getCourseById(@PathVariable Long id) {
        Optional<DateCourse> course = dateCourseService.getCourseById(id);
        return course.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build()); // 404 Not Found
    }

    // 모든 코스 목록 조회
    @GetMapping("/datecourses")
    public ResponseEntity<List<DateCourse>> getPagedCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
//        Page<DateCourse> courses = dateCourseService.getPagedCourses(page, size);
        List<DateCourse> course = dateCourseService.getAllCourses();
        return ResponseEntity.ok(course);
    }


    // 특정 코스의 지도 경로 조회
    @GetMapping("/{id}/map")
    public ResponseEntity<String> getMapRoute(@PathVariable Long id, HttpServletRequest request) {
        // 토큰 검증
        if (!authTokenUtil.validateAccessToken(request)) {
            log.error("Invalid or expired access token.");
            return ResponseEntity.status(401).body(null);  // 인증 실패 (401 Unauthorized)
        }

        String mapRoute = dateCourseService.getMapRoute(id);
        return ResponseEntity.ok(mapRoute); // 200 OK 응답
    }
    // 검색 및 필터링
    @GetMapping("/datecourses/search")
    public ResponseEntity<List<DateCourse>> searchCourses(@RequestParam String keyword) {
        List<DateCourse> courses = dateCourseService.searchCourses(keyword);
        return ResponseEntity.ok(courses);
    }

}
