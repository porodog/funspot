package com.spot.fun.token.controller;

import com.spot.fun.token.dto.AuthTokenDTO;
import com.spot.fun.token.service.AuthTokenService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/usr/token")
public class AuthTokenController {
    private final AuthTokenService authTokenService;

    @PostMapping("/refresh")
    public AuthTokenDTO refresh(HttpServletRequest request) {
        return authTokenService.doRefreshToken(request);
    }
}
