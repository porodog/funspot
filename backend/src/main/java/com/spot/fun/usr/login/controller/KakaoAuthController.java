package com.spot.fun.usr.login.controller;

import com.spot.fun.config.jwt.JwtTokenProvider;
import com.spot.fun.token.util.AuthTokenUtil;
import com.spot.fun.usr.oauthlogin.dto.KakaoTokenResponse;
import com.spot.fun.usr.oauthlogin.dto.KakaoUserInfo;
import com.spot.fun.usr.user.entity.User;
import com.spot.fun.usr.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;
import java.util.Optional;

@Log4j2
@RestController
@RequestMapping("/api/auth/kakao")
@RequiredArgsConstructor
public class KakaoAuthController {

  private final WebClient webClient;
  private final JwtTokenProvider jwtTokenProvider;
  private final UserRepository userRepository;
  private final AuthTokenUtil authTokenUtil;

  @Value("${kakao.client-id}")
  private String clientId;

  @Value("${kakao.redirect-uri}")
  private String redirectUri;

  @Value("${kakao.token-url}")
  private String kakaoTokenUrl;

  @Value("${kakao.user-info-url}")
  private String kakaoUserInfoUrl;

  @PostMapping("/login")
  public ResponseEntity<?> kakaoLogin(@RequestParam("code") String code, HttpServletResponse response) {
    log.info("Received Kakao login request with code: {}", code);

    // 1. 카카오 액세스 토큰 요청
    String accessToken = requestAccessToken(code);
    log.info("Retrieved Kakao access token: {}", accessToken);

    // 2. 사용자 정보 요청
    KakaoUserInfo kakaoUserInfo = requestUserInfo(accessToken);
    log.info("Retrieved Kakao user info: {}", kakaoUserInfo);

    // 3. 사용자 확인
    Optional<User> userOptional = userRepository.findByEmail(kakaoUserInfo.getEmail());
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      log.info("Existing user found: {}", user.getEmail());
      handleUserLogin(user, response);

      return ResponseEntity.ok(Map.of(
              "success", true,
              "message", "로그인 성공",
              "user", Map.of(
                      "email", user.getEmail(),
                      "nickname", user.getNickname()
              )
      ));
    } else {
      log.info("New user detected. Redirecting to social-signup.");
      storeOAuthSessionData(kakaoUserInfo);

      return ResponseEntity.ok(Map.of(
              "success", false,
              "message", "회원가입 필요",
              "redirectUrl", "/social-signup"
      ));
    }
  }

  private String requestAccessToken(String code) {
    return webClient.post()
            .uri(kakaoTokenUrl)
            .bodyValue(Map.of(
                    "grant_type", "authorization_code",
                    "client_id", clientId,
                    "redirect_uri", redirectUri,
                    "code", code
            ))
            .retrieve()
            .bodyToMono(KakaoTokenResponse.class)
            .block()
            .getAccessToken();
  }

  private KakaoUserInfo requestUserInfo(String accessToken) {
    return webClient.get()
            .uri(kakaoUserInfoUrl)
            .header("Authorization", "Bearer " + accessToken)
            .retrieve()
            .bodyToMono(KakaoUserInfo.class)
            .block();
  }

  private void handleUserLogin(User user, HttpServletResponse response) {
    String jwtAccessToken = jwtTokenProvider.generateAccessToken(user);
    String jwtRefreshToken = jwtTokenProvider.generateRefreshToken(user);

    response.setHeader("Authorization", "Bearer " + jwtAccessToken);
    authTokenUtil.makeAccessToken(response, jwtAccessToken);
    authTokenUtil.makeRefreshToken(response, jwtRefreshToken);
  }

  private void storeOAuthSessionData(KakaoUserInfo kakaoUserInfo) {
    HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    HttpSession session = request.getSession();
    session.setAttribute("oauthEmail", kakaoUserInfo.getEmail());
    session.setAttribute("oauthNickname", kakaoUserInfo.getNickname());
  }
}
