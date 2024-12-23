package com.spot.fun.usr.searchuserinfo.controller;

import com.spot.fun.token.util.AuthTokenUtil;
import com.spot.fun.usr.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/usr/searchuserinfo")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;
  private final AuthTokenUtil authTokenUtil;

  @PostMapping("/search-id")
  public ResponseEntity<?> searchUserId(@RequestBody Map<String, String> searchDetails) {
    String name = searchDetails.get("name");
    String birthDate = searchDetails.get("birthDate");
    String email = searchDetails.get("email");

    try {
      String userId = userService.findUserIdByDetails(name, birthDate, email);
      return ResponseEntity.ok(Map.of("userId", userId));
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자 정보를 찾을 수 없습니다.");
    }
  }

  @PostMapping("/update-password")
  public ResponseEntity<?> updatePassword(@RequestBody Map<String, String> passwordDetails) {
    String userId = passwordDetails.get("userId");
    String email = passwordDetails.get("email");
    String newPassword = passwordDetails.get("newPassword");

    try {
      userService.updatePassword(userId, email, newPassword); // 서비스 호출
      return ResponseEntity.ok(Map.of("message", "비밀번호가 성공적으로 변경되었습니다."));
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
              .body(Map.of("error", e.getMessage()));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
              .body(Map.of("error", "비밀번호 변경 중 문제가 발생했습니다."));
    }
  }

  @PostMapping("/deactivate")
  public ResponseEntity<?> deactivateUser(@RequestBody Map<String, Long> request) {
    try {
      Long userIdx = request.get("userIdx"); // JSON에서 userIdx 추출
      if (userIdx == null) {
        return ResponseEntity.badRequest().body(Map.of("message", "userIdx가 필요합니다."));
      }

      userService.deactivateUser(userIdx); // 회원 비활성화 처리

      return ResponseEntity.ok(Map.of("message", "회원 탈퇴가 완료되었습니다."));
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "서버 오류가 발생했습니다."));
    }
  }



}
