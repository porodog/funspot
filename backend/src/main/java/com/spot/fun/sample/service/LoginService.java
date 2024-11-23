package com.spot.fun.sample.service;

import com.spot.fun.sample.dto.AuthTokenDTO;
import com.spot.fun.sample.dto.UserDTO;

public interface LoginService {
    AuthTokenDTO doLogin(UserDTO userDTO);
}
