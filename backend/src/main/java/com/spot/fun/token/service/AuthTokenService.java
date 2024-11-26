package com.spot.fun.token.service;

import com.spot.fun.token.dto.AuthTokenDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface AuthTokenService {
    AuthTokenDTO doRefreshToken(HttpServletRequest request);
}
