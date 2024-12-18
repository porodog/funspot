package com.spot.fun.usr.user.controller;

import com.spot.fun.usr.user.dto.UserDTO;
import com.spot.fun.usr.user.repository.UserRepository;
import com.spot.fun.usr.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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


}
