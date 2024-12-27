package com.spot.fun.adm.user.service;

import com.spot.fun.adm.user.dto.AdminUserDTO;
import com.spot.fun.usr.user.dto.UserRole;

import java.util.List;

public interface AdminUserService {

  // 관리자 전용 사용자 조회
  List<AdminUserDTO> getAllUsers();

  // use_yn 및 user_role 업데이트
  void updateUser(Long id, String useYn, UserRole userRole);
}
