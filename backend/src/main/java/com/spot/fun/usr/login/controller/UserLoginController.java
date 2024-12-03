package com.spot.fun.usr.login.controller;

import com.spot.fun.token.dto.AuthTokenDTO;
import com.spot.fun.token.util.AuthTokenUtil;
import com.spot.fun.usr.login.service.UserLoginService;
import com.spot.fun.usr.user.dto.UserDTO;
import com.spot.fun.usr.user.entity.User;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/usr/login")
public class UserLoginController {
    private final UserLoginService userLoginService;
    private final AuthTokenUtil authTokenUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO, HttpServletResponse response) {
        try {
            AuthTokenDTO authTokenDTO = userLoginService.doLogin(userDTO);

            // 쿠키 생성
            authTokenUtil.makeAccessToken(response, authTokenDTO.getAccessToken());
            authTokenUtil.makeRefreshToken(response, authTokenDTO.getRefreshToken());

            return ResponseEntity.status(HttpStatus.OK).body(authTokenDTO.getNickname());
        } catch (AuthenticationException e) {
            log.error("Authentication failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
        } catch (Exception e) {
            log.error("Login Controller Error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    /**
     * 현재 사용자 정보 조회 엔드포인트
     */
//    @GetMapping("/me")
//    public ResponseEntity<UserDTO> getCurrentUser(Authentication authentication) {
//        if (authentication == null || !(authentication.getPrincipal() instanceof User)) {
//            throw new RuntimeException("유효하지 않은 사용자");
//        }
//
//        User user = (User) authentication.getPrincipal();
//        UserDTO userDTO = UserDTO.builder()
//                .idx(user.getIdx())
//                .userId(user.getUserId())
//                .nickname(user.getNickname())
//                .email(user.getEmail())
//                .build();
//
//        return ResponseEntity.ok(userDTO);
//    }
}
