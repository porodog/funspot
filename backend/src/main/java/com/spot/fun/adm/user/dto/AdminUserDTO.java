package com.spot.fun.adm.user.dto;

import com.spot.fun.usr.user.dto.UserRole;
import com.spot.fun.usr.user.entity.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminUserDTO {
  private Long idx;              // 사용자 고유 번호
  private String userId;        // 아이디
  private String name;           // 이름
  private String birthDate;   // 생년월일
  private String nickname;       // 닉네임
  private String email;           // 이메일
  private String phone;          // 전화번호
  private String zonecode;       // 우편번호
  private String address;        // 주소
  private String detaileAdd;     // 상세 주소
  private String provider;        // 가입경로
  private UserRole userRole;      // 사용자 권한
  private String useYn;           // 사용자 활성화상태

  public static AdminUserDTO fromEntity(User user) {
    return AdminUserDTO.builder()
            .idx(user.getIdx())
            .userId(user.getUserId())
            .name(user.getName())
            .nickname(user.getNickname())
            .email(user.getEmail())
            .phone(user.getPhone())
            .zonecode(user.getZonecode())
            .address(user.getAddress())
            .detaileAdd(user.getDetaileAdd())
            .userRole(user.getUserRole())
            .provider(user.getProvider())
            .useYn(user.getUseYn())
            .build();
  }
}
