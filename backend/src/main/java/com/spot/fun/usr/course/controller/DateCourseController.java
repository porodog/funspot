package com.spot.fun.usr.course.controller;

import com.spot.fun.token.util.AuthTokenUtil;
import com.spot.fun.usr.course.model.DateCourse;
import com.spot.fun.usr.course.service.DateCourseService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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

    @PostMapping("/addcourse")
    public ResponseEntity<DateCourse> addCourse(@RequestBody DateCourse dateCourse,
                                                HttpServletRequest request,
                                                HttpServletResponse response) {

        // 인증된 사용자만 코스를 추가할 수 있도록 처리
        DateCourse createdCourse = dateCourseService.addCourse(dateCourse);
        return ResponseEntity.ok(createdCourse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DateCourse> getCourseById(@PathVariable Long id,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) {
        log.info("dldldldlldldldldldldldldl");


        Optional<DateCourse> course = dateCourseService.getCourseById(id);
        return course.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/datecourses")
    public ResponseEntity<List<DateCourse>> getAllCourses(HttpServletRequest request,
                                                          HttpServletResponse response) {
        log.info("asdakfjhpajfpagpapagnpagnspangnaspgnpasnpgnapsng");
        // 토큰 검증
//        if (!authTokenUtil.validateAccessToken(request)) {
//            log.error("Invalid or expired access token.");
//            return ResponseEntity.status(401).body(null);  // 인증 실패 (401 Unauthorized)
//        }

        List<DateCourse> courses = dateCourseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{id}/map")
    public ResponseEntity<String> getMapRoute(@PathVariable Long id,
                                              HttpServletRequest request,
                                              HttpServletResponse response) {
        // 토큰 검증
        if (!authTokenUtil.validateAccessToken(request)) {
            log.error("Invalid or expired access token.");
            return ResponseEntity.status(401).body(null);  // 인증 실패 (401 Unauthorized)
        }

        String mapRoute = dateCourseService.getMapRoute(id);
        return ResponseEntity.ok(mapRoute);
    }
}
