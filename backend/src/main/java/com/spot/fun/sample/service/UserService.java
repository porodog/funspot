package com.spot.fun.sample.service;

import com.spot.fun.sample.dto.UserDTO;

public interface UserService {
    UserDTO findByIdx(Long idx);
    UserDTO findByUserId(String userId);
}
