package com.spot.fun.usr.oauthlogin.controller;

import com.spot.fun.common.response.BaseResponse;
import com.spot.fun.usr.oauthlogin.dto.UserRequestDTO;
import com.spot.fun.usr.oauthlogin.dto.UserResponseDTO;
import com.spot.fun.usr.oauthlogin.service.AuthService;
import com.spot.fun.usr.user.entity.User;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class KakaoAuthController {
  private final AuthService authService;

  @PostMapping ("/login")
  public ResponseEntity<?> join(@RequestBody UserRequestDTO.LoginRequestDTO loginRequestDTO) {
    return null;
  }

  @GetMapping("/login/oauth2/code/kakao")
  public ResponseEntity<?> kakaoLoginOrRedirect(
          @RequestParam("code") String accessCode,
          @RequestParam(value = "responseType", required = false, defaultValue = "redirect") String responseType,
          HttpServletResponse httpServletResponse) {

    // 카카오 로그인 처리
    User user = authService.oAuthLogin(accessCode, httpServletResponse);

    if ("json".equalsIgnoreCase(responseType)) {
      // JSON 응답 반환 (BaseResponse 사용)
      return ResponseEntity.ok(BaseResponse.onSuccess(UserResponseDTO.fromEntity(user)));
    }

    // 리다이렉트 처리
    if (user.isNewUser()) {
      httpServletResponse.setHeader("Location", "http://localhost:3000/social-signup");
    } else {
      httpServletResponse.setHeader("Location", "http://localhost:3000/login-success");
    }
    return ResponseEntity.status(HttpStatus.FOUND).build();
  }

}
