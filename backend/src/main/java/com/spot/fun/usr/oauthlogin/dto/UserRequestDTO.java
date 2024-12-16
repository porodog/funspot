package com.spot.fun.usr.oauthlogin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class UserRequestDTO {
  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class LoginRequestDTO {
    private String userId;     // 사용자 ID
    private String password;   // 비밀번호
  }
}
