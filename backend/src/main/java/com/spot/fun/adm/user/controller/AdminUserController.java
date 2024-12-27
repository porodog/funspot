package com.spot.fun.adm.user.controller;

import com.spot.fun.adm.user.dto.AdminUserDTO;
import com.spot.fun.adm.user.service.AdminUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adm/users")
@RequiredArgsConstructor
public class AdminUserController {
  private final AdminUserService adminUserService;

  // 관리자 전용 사용자 리스트 조회
  @GetMapping("/list")
  public ResponseEntity<List<AdminUserDTO>> getAllUsers() {
    List<AdminUserDTO> users = adminUserService.getAllUsers();
    return ResponseEntity.ok(users);
  }

  // use_yn 및 user_role 업데이트
  @PutMapping("/{idx}")
  public ResponseEntity<Void> updateUser(
          @PathVariable Long id,
          @RequestBody AdminUserDTO adminUserDTO) {
    adminUserService.updateUser(id, adminUserDTO.getUseYn(), adminUserDTO.getUserRole());
    return ResponseEntity.ok().build();
  }
}
