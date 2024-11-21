package com.spot.fun.sample.dto;

import com.spot.fun.sample.entity.AuthToken;
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
