package com.spot.fun.usr.login.service;

import com.spot.fun.token.dto.AuthTokenDTO;
import com.spot.fun.usr.user.dto.UserDTO;

public interface UserLoginService {
    AuthTokenDTO doLogin(UserDTO userDTO);
}
