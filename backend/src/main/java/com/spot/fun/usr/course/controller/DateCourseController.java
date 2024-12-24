package com.spot.fun.usr.course.controller;

import com.spot.fun.token.util.AuthTokenUtil;
import com.spot.fun.usr.course.model.DateCourse;
import com.spot.fun.usr.course.model.DatePlaces;
import com.spot.fun.usr.course.service.DateCourseService;
import com.spot.fun.usr.user.dto.UserDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@RestController
@RequestMapping("/api/usr/course")
public class DateCourseController {

    @Autowired
    private AuthTokenUtil authTokenUtil;

    @Autowired
    private DateCourseService dateCourseService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getCourseById(@PathVariable("id") Long id, HttpServletRequest request, HttpServletResponse response) {
        try {
            // 사용자 검증
            UserDTO loginUserDto = authTokenUtil.validateTokenAndGetUserDTO(request, response);
            if (loginUserDto == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 사용자입니다.");
            }
            Long loginUserid = loginUserDto.getIdx();
            log.info("Requested Course ID: {}", id);
            log.info("Login User ID: {}", loginUserid);

            // 서비스 메서드 호출
            Optional<DateCourse> courseOptional = dateCourseService.getCourseById(id, loginUserid);
            if (courseOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 ID의 코스를 찾을 수 없습니다.");
            }

            DateCourse course = courseOptional.get();

            // 장소 ID 추출
            List<Long> placeIds = course.getPlaces()
                    .stream()
                    .map(DatePlaces::getId)
                    .collect(Collectors.toList());
            log.info("Place IDs: {}", placeIds);

            // 응답 데이터 생성
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("id", course.getId());
            responseMap.put("name", course.getName());
            responseMap.put("description", course.getDescription());
            responseMap.put("placeIds", placeIds);

            return ResponseEntity.ok(responseMap);

        } catch (Exception e) {
            log.error("Error occurred while fetching course", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터를 불러오는 중 문제가 발생했습니다.");
        }
    }
}
