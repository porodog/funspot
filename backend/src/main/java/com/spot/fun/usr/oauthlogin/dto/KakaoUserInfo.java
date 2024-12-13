package com.spot.fun.usr.oauthlogin.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoUserInfo {
  @JsonProperty("id")
  private Long id;

  @JsonProperty("connected_at")
  private String connectedAt;

  @JsonProperty("kakao_account")
  private KakaoAccount kakaoAccount;

  @Getter
  @Setter
  public static class KakaoAccount {
    @JsonProperty("email")
    private String email;

    @JsonProperty("profile")
    private Profile profile;

    @Getter
    @Setter
    public static class Profile {
      @JsonProperty("nickname")
      private String nickname;
    }
  }

  public String getEmail() {
    if (kakaoAccount != null) {
      return kakaoAccount.getEmail();
    }
    return null;
  }

  public String getNickname() {
    if (kakaoAccount != null && kakaoAccount.getProfile() != null) {
      return kakaoAccount.getProfile().getNickname();
    }
    return null;
  }
}

