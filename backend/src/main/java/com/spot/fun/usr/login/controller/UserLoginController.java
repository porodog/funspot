package com.spot.fun.usr.login.controller;

import com.spot.fun.token.dto.AuthTokenDTO;
import com.spot.fun.usr.login.service.UserLoginService;
import com.spot.fun.usr.user.dto.UserDTO;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/usr/login")
public class UserLoginController {
    private final UserLoginService userLoginService;

    @Value("${jwt.refresh.token.hour}")
    private int REFRESH_TOKEN_HOUR;

    @PostMapping("/login")
    public AuthTokenDTO login(HttpServletResponse response, UserDTO userDTO) {
        AuthTokenDTO authTokenDTO = userLoginService.doLogin(userDTO);

        // 리프레시토큰 쿠키추가
        ResponseCookie refreshTokenCookie = ResponseCookie.from("refresh_token", authTokenDTO.getRefreshToken())
                .httpOnly(true) // 자바스크립트 접근불가
                //.secure(true) // https에서만 전송처리
                .path("/")
                .maxAge(Duration.ofHours(REFRESH_TOKEN_HOUR).toSeconds()) // 유효 기간
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

        authTokenDTO.setRefreshToken(null);
        return authTokenDTO;
    }
}
