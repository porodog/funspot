package com.spot.fun.sample.service;

import com.spot.fun.sample.dto.AuthTokenDTO;
import com.spot.fun.sample.dto.UserDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface LoginService {
    AuthTokenDTO doLogin(UserDTO userDTO);
    AuthTokenDTO doRefreshToken(HttpServletRequest request);
}
