package com.spot.fun.token.dto;

import com.spot.fun.token.entity.AuthToken;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthTokenDTO {
    private String accessToken;
    private String refreshToken;

    @Builder
    public AuthTokenDTO(AuthToken authToken) {
        this.refreshToken = authToken.getRefreshToken();
    }
}
