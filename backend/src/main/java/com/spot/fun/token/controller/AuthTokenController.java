package com.spot.fun.token.controller;

import com.spot.fun.config.jwt.JwtTokenProvider;
import com.spot.fun.token.dto.AuthTokenDTO;
import com.spot.fun.token.service.AuthTokenService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/token")
public class AuthTokenController {
    private final AuthTokenService authTokenService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/access")
    public ResponseEntity<?> access(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        /*if (!StringUtils.isBlank(token) && jwtTokenProvider.validToken(token)) {
            return ResponseEntity.status(HttpStatus.OK).body("access ok");
        } else {
            // 401 리턴
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("access token invalid");
        }*/

        // 에러콘솔로그 거슬려서.. 일단 결과값으로 구분처리
        if (!StringUtils.isBlank(token) && jwtTokenProvider.validToken(token)) {
            return ResponseEntity.status(HttpStatus.OK).body(Map.of("result", true));
        }
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("result", false));
    }

    @PostMapping("/refresh")
    public AuthTokenDTO refresh(HttpServletRequest request) {
        return authTokenService.doRefreshToken(request);
    }
}
