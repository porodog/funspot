package com.spot.fun.sample.controller;

import com.spot.fun.config.jwt.JwtTokenProvider;
import com.spot.fun.sample.dto.AuthTokenDTO;
import com.spot.fun.sample.dto.UserDTO;
import com.spot.fun.sample.dto.UserRole;
import com.spot.fun.sample.entity.AuthToken;
import com.spot.fun.sample.entity.User;
import com.spot.fun.sample.repository.TokenRepository;
import com.spot.fun.sample.repository.UserRepository;
import com.spot.fun.sample.service.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.HashMap;
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


    @GetMapping("/hello")
    public Map<String, Object> hello() {
        return Map.of("message", "hello@@");
    }

    @GetMapping("/test")
    public Map<String, Object> test() {

        User testUser = userRepository.save(
                User.builder()
                        .userId("user001")
                        .password(bCryptPasswordEncoder.encode("1234"))
                        .userRole(UserRole.ROLE_USER)
                        .build()
        );

        String accessToken = jwtTokenProvider.generateAccessToken(testUser);
        String refreshToken = jwtTokenProvider.generateRefreshToken(testUser);
        tokenRepository.save(new AuthToken(testUser.getIdx(), refreshToken));

        AuthTokenDTO authTokenDTO = new AuthTokenDTO();
        authTokenDTO.setRefreshToken(refreshToken);

        Map<String, Object> map = new HashMap<>();
        map.put("access_token", accessToken);
        map.put("refresh_token", refreshToken);
        return map;
    }

    @PostMapping("/login")
    public AuthTokenDTO login(UserDTO userDTO) {
        return loginService.doLogin(userDTO);
    }

}
