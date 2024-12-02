package com.spot.fun.token.dto;

import com.spot.fun.token.entity.AuthToken;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
//@AllArgsConstructor
public class AuthTokenDTO {
    private String accessToken;
    private String refreshToken;
    private String nickname;

    @Builder
    public AuthTokenDTO(String accessToken, String refreshToken, String nickname) {
//        this.refreshToken = authToken.getRefreshToken();
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.nickname = nickname;
    }
}
