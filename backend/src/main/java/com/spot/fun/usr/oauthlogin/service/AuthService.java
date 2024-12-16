package com.spot.fun.usr.oauthlogin.service;

import com.spot.fun.config.jwt.JwtTokenProvider;
import com.spot.fun.token.util.AuthTokenUtil;
import com.spot.fun.usr.oauthlogin.dto.KakaoDTO;
import com.spot.fun.usr.oauthlogin.utill.KakaoUtil;
import com.spot.fun.usr.user.dto.UserRole;
import com.spot.fun.usr.user.entity.User;
import com.spot.fun.usr.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final KakaoUtil kakaoUtil;
  private final UserRepository userRepository;
  private final AuthTokenUtil authTokenUtil;
  private final JwtTokenProvider jwtTokenProvider;
  private final PasswordEncoder passwordEncoder;

  public User oAuthLogin(String accessCode, HttpServletResponse httpServletResponse) {
    KakaoDTO.OAuthToken oAuthToken = kakaoUtil.requestToken(accessCode);
    KakaoDTO.KakaoProfile kakaoProfile = kakaoUtil.requestProfile(oAuthToken);
    String email = kakaoProfile.getKakao_account().getEmail();

    User user = userRepository.findByEmail(email)
            .orElseGet(() -> createNewUser(kakaoProfile));

    // 엑세스 토큰 및 리프레시 토큰 생성
    String accessToken = jwtTokenProvider.generateAccessToken(user);
    String refreshToken = jwtTokenProvider.generateRefreshToken(user);

    // 리프레시 토큰 저장/갱신
    authTokenUtil.saveOrUpdateRefreshToken(user.getIdx(), refreshToken);

    // HTTP 응답 헤더 및 쿠키에 토큰 추가
    httpServletResponse.setHeader("Authorization", "Bearer " + accessToken);
    authTokenUtil.makeAccessToken(httpServletResponse, accessToken);
    authTokenUtil.makeRefreshToken(httpServletResponse, refreshToken);


    return user;
  }


  private User createNewUser(KakaoDTO.KakaoProfile kakaoProfile) {
    User newUser = AuthConverter.toUser(
            kakaoProfile.getKakao_account().getEmail(),
            kakaoProfile.getKakao_account().getProfile().getNickname(),
            null,
            passwordEncoder
    );
    return userRepository.save(newUser);
  }

  public class AuthConverter {

    public static User toUser(String email, String name, String password, PasswordEncoder passwordEncoder) {
      return User.builder()
              .email(email)
              .userRole(UserRole.ROLE_USER)
              .password(passwordEncoder.encode(password))
              .name(name)
              .build();
    }
  }
}