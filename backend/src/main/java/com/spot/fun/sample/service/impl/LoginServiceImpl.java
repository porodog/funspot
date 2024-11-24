package com.spot.fun.sample.service.impl;

import com.spot.fun.config.jwt.JwtTokenProvider;
import com.spot.fun.sample.dto.AuthTokenDTO;
import com.spot.fun.sample.dto.UserDTO;
import com.spot.fun.sample.entity.AuthToken;
import com.spot.fun.sample.entity.User;
import com.spot.fun.sample.repository.TokenRepository;
import com.spot.fun.sample.repository.UserRepository;
import com.spot.fun.sample.service.LoginService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;

    @Override
    public AuthTokenDTO doLogin(UserDTO userDTO) {
        // 403 << 로그인 실패 시 응답코드
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userDTO.getUserId(),
                        userDTO.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();
        Long userIdx = user.getIdx();

        String accessToken = jwtTokenProvider.generateAccessToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);

        if(tokenRepository.existsByUserIdx(userIdx)) {
            tokenRepository.deleteByUserIdx(userIdx);
        }

        tokenRepository.save(
                AuthToken.builder()
                        .refreshToken(refreshToken)
                        .userIdx(userIdx)
                        .build()
        );

        return new AuthTokenDTO(accessToken, refreshToken);
    }

    @Override
    public AuthTokenDTO doRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String refreshToken = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh_token".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();  // 리프레시 토큰을 추출
                    break;
                }
            }
        }

        if(StringUtils.isBlank(refreshToken) || !jwtTokenProvider.validToken(refreshToken)) {
            // 쿠키에서 리프레시 토큰조회 + 사용가능여부 체크
            throw new RuntimeException("refresh token is empty or validate failed");
            //return AuthTokenDTO.builder().build();
        }

        // 엑세스 토큰 재발급
        AuthToken authToken = tokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("데이터베이스에서 조회할 수 없는 토큰"));
        User user = userRepository.findByIdx(authToken.getUserIdx())
                .orElseThrow(() -> new IllegalArgumentException("찾을 수 없는 사용자"));
        String accessToken = jwtTokenProvider.generateAccessToken(user);

        return new AuthTokenDTO(accessToken, null);
    }


}
