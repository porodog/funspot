package com.spot.fun.usr.user.service.profile;

import com.spot.fun.usr.user.dto.profile.UserProfileRequestDTO;
import com.spot.fun.usr.user.dto.profile.UserProfileResponseDTO;

public interface UserProfileService {
  UserProfileResponseDTO getProfile(UserProfileRequestDTO userProfileRequestDTO);

  UserProfileResponseDTO getDuplicate(UserProfileRequestDTO userProfileRequestDTO);

  UserProfileResponseDTO putProfile(UserProfileRequestDTO userProfileRequestDTO);

  UserProfileResponseDTO getProfileByNickname(String nickname);

}

