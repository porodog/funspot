package com.spot.fun.usr.oauthlogin.dto;

import com.spot.fun.usr.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserResponseDTO {
  private Long idx;       // 사용자 고유 번호
  private String nickname;
  private String email;

  public static UserResponseDTO fromEntity(User user) {
    return UserResponseDTO.builder()
            .idx(user.getIdx())
            .nickname(user.getNickname())
            .email(user.getEmail())
            .build();
  }

}
