package com.spot.fun.usr.user.service;

import com.spot.fun.usr.user.dto.UserDTO;

public interface UserService {
    UserDTO findByIdx(Long idx);
    UserDTO findByUserId(String userId);
}
