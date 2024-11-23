package com.spot.fun.sample.service.impl;

import com.spot.fun.config.jwt.JwtTokenProvider;
import com.spot.fun.sample.dto.AuthTokenDTO;
import com.spot.fun.sample.dto.UserDTO;
import com.spot.fun.sample.entity.AuthToken;
import com.spot.fun.sample.entity.User;
import com.spot.fun.sample.repository.TokenRepository;
import com.spot.fun.sample.service.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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
}
