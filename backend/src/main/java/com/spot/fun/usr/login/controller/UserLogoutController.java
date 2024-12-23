package com.spot.fun.usr.login.controller;

import com.spot.fun.token.repository.AuthTokenRepository;
import com.spot.fun.token.util.AuthTokenUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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

  private final AuthTokenUtil authTokenUtil;

  @PostMapping("/logout")
  public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {

    boolean result = authTokenUtil.removeTokenAndLogout(request, response);

    if (result) {
      log.info("Logout successful.");
      return ResponseEntity.ok().build(); // 상태 코드 200 반환: 로그아웃 성공
    } else {
      log.warn("Logout failed: Invalid or missing token.");
      return ResponseEntity.status(401).build(); // 상태 코드 401 반환: 토큰이 유효하지 않음
    }
//    return ResponseEntity.noContent().build(); // 상태 코드 204 반환
  }
}
