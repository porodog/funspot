package com.spot.fun.usr.user.controller;

import com.spot.fun.usr.user.dto.UserDTO;
import com.spot.fun.usr.user.entity.User;
import com.spot.fun.usr.user.repository.UserRepository;
import com.spot.fun.usr.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

import java.util.Map;

@Log4j2
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class EditUserInfoController {

  private final UserService userService;
  private final UserRepository userRepository;


  // 비밀번호 확인 API
  @PostMapping("/check-password")
  public ResponseEntity<?> checkPassword(@RequestBody UserDTO userDTO, Principal principal) {
    String loggedInUserId = principal.getName();
    boolean isPasswordCorrect = userService.checkPassword(loggedInUserId, userDTO.getPassword());

    if (isPasswordCorrect) {
      return ResponseEntity.ok("비밀번호가 확인되었습니다.");
    } else {
      return ResponseEntity.status(400).body("비밀번호가 일치하지 않습니다.");
    }
  }

  // 회원 정보 조회 API
  @GetMapping("/profile")
  public ResponseEntity<?> getUserProfile(Principal principal) {
    String loggedInUserId = principal.getName();
    UserDTO userProfile = userService.findUserProfile(loggedInUserId); // 비밀번호 제외

    // 소셜 회원은 비밀번호 관련 필드 제거
    if (!"LOCAL".equals(userProfile.getProvider())) {
      userProfile.setPassword(null);
      userProfile.setNewPassword(null);
    }

    return ResponseEntity.ok(userProfile);
  }

  // 회원 정보 수정 API
  @PostMapping("/update")
  public ResponseEntity<?> updateUser(@RequestBody UserDTO userDTO, Principal principal) {
    String loggedInUserId = principal.getName();
    try {
      userService.validateAndUpdateUserProfile(loggedInUserId, userDTO);
      return ResponseEntity.ok(Map.of("status", "success", "message", "회원 정보가 수정되었습니다."));
    } catch (IllegalArgumentException e) {
      log.warn("유효성 검사 실패: {}", e.getMessage());
      String[] errorInfo = e.getMessage().split(":");
      String field = errorInfo.length > 1 ? errorInfo[0] : "unknown";
      String message = errorInfo.length > 1 ? errorInfo[1] : e.getMessage();
      return ResponseEntity.badRequest().body(Map.of("status", "error", "field", field, "message", message));
    } catch (Exception e) {
      log.error("정보 수정 중 오류 발생", e);
      return ResponseEntity.status(500).body(Map.of("status", "error", "message", "서버에 문제가 발생했습니다."));
    }
  }

  @PostMapping("/phone-check")
  public ResponseEntity<?> checkPhoneDuplicate(@RequestBody UserDTO userDTO) {
    boolean isDuplicate = userRepository.existsByPhone(userDTO.getPhone());
    return ResponseEntity.ok(Map.of("isDuplicate", isDuplicate));
  }


  @PostMapping("/verify-password")
  public ResponseEntity<?> verifyPassword(@RequestBody Map<String, String> request) {
    try {
      // 요청에서 비밀번호 가져오기
      String password = request.get("password");
      if (password == null || password.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of("message", "비밀번호를 입력해주세요."));
      }

      // 로그인된 사용자 정보 가져오기 (SecurityContext 사용)
      User user = userService.getCurrentUser()
              .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

      // 비밀번호 확인
      boolean isPasswordValid = userService.checkPassword(user.getUserId(), password);
      if (!isPasswordValid) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "비밀번호가 올바르지 않습니다."));
      }

      return ResponseEntity.ok(Map.of("message", "비밀번호 확인 성공"));
    } catch (Exception e) {
      log.error("비밀번호 확인 중 오류 발생:", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "서버 오류가 발생했습니다."));
    }
  }

}
