package com.spot.fun.sample.controller;

import com.spot.fun.config.jwt.JwtTokenProvider;
import com.spot.fun.sample.dto.AuthTokenDTO;
import com.spot.fun.sample.dto.UserDTO;
import com.spot.fun.sample.repository.TokenRepository;
import com.spot.fun.sample.repository.UserRepository;
import com.spot.fun.sample.service.LoginService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sample")
public class SampleController {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final LoginService loginService;

    @Value("${jwt.refresh.token.hour}")
    private int REFRESH_TOKEN_HOUR;

    @GetMapping("/hello")
    public Map<String, Object> hello() {
        return Map.of("message", "hello@@");
    }

    @PostMapping("/login")
    public AuthTokenDTO login(HttpServletResponse response, UserDTO userDTO) {
        AuthTokenDTO authTokenDTO = loginService.doLogin(userDTO);

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

    @PostMapping("/refresh")
    public AuthTokenDTO refresh(HttpServletRequest request) {
        return loginService.doRefreshToken(request);
    }

}
