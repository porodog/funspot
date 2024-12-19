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
    private Long idx;
    private String accessToken;
    private String refreshToken;
    private String nickname;
    private String useYn;

    @Builder
    public AuthTokenDTO(String accessToken, String refreshToken, String nickname, Long idx, String useYn) {
//        this.refreshToken = authToken.getRefreshToken();
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.nickname = nickname;
        this.useYn = useYn;
        this.idx = idx;
    }
}
