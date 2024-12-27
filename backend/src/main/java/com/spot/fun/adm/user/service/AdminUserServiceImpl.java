package com.spot.fun.adm.user.service;

import com.spot.fun.adm.user.dto.AdminUserDTO;
import com.spot.fun.usr.user.dto.UserRole;
import com.spot.fun.usr.user.entity.User;
import com.spot.fun.usr.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService {

  private final UserRepository userRepository;

  @Override
  public List<AdminUserDTO> getAllUsers() {
    // 모든 사용자 조회 (관리자 전용 DTO로 변환)
    return userRepository.findAll().stream()
            .map(AdminUserDTO::fromEntity)
            .collect(Collectors.toList());
  }

  @Override
  public void updateUser(Long id, String useYn, UserRole userRole) {
    // 사용자 조회 및 업데이트
    User user = userRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다. ID: " + id));

    user.changeUseYn(useYn);
    user.changeUserRole(userRole);

    userRepository.save(user);
  }
}
