package com.spot.fun.usr.user.utill;

import com.spot.fun.usr.oauthlogin.dto.UserResponseDTO;
import com.spot.fun.usr.user.entity.User;

public class UserConverter {
  public static UserResponseDTO toJoinResultDTO(User user) {
    return UserResponseDTO.fromEntity(user);
  }
}
