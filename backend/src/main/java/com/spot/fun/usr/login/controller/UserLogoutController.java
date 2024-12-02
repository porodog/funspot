package com.spot.fun.usr.login.controller;

import com.spot.fun.token.repository.AuthTokenRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/usr/logout")
public class UserLogoutController {

  private final AuthTokenRepository authTokenRepository;

  @PostMapping("/logout")
  public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
    // 쿠키에서 리프레시 토큰 추출
    String refreshToken = extractRefreshTokenFromCookies(request);

    if (refreshToken != null) {
      // 리프레시 토큰이 데이터베이스에 존재하면 삭제
      authTokenRepository.findByRefreshToken(refreshToken)
              .ifPresent(authTokenRepository::delete);
    }

    // 리프레시 토큰 쿠키 삭제 처리
    ResponseCookie refreshTokenCookie = ResponseCookie.from("refresh_token", "")
            .httpOnly(true)
            .path("/") // 전역 경로
            .maxAge(0) // 즉시 만료
            .build();
    response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

    log.info("사용자가 로그아웃했습니다. 리프레시 토큰이 삭제되었습니다.");
    return ResponseEntity.noContent().build(); // 상태 코드 204 반환
  }

  private String extractRefreshTokenFromCookies(HttpServletRequest request) {
    if (request.getCookies() == null) {
      return null; // 쿠키가 없는 경우 null 반환
    }

    // 쿠키 배열에서 리프레시 토큰 검색
    return Arrays.stream(request.getCookies())
            .filter(cookie -> "refresh_token".equals(cookie.getName()))
            .map(Cookie::getValue)
            .findFirst()
            .orElse(null);
  }
}
