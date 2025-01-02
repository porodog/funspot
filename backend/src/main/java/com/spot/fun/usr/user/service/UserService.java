package com.spot.fun.usr.user.service;

import com.spot.fun.usr.user.dto.UserDTO;
import com.spot.fun.usr.user.entity.User;

import java.util.Optional;

public interface UserService {
    UserDTO findByIdx(Long idx);
    UserDTO findByUserId(String userId);
    String findUserIdByDetails(String name, String birthDate, String email);
    void updatePassword(String userId, String email, String newPassword);
    boolean checkPassword(String userId, String rawPassword);
    void validateAndUpdateUserProfile(String userId, UserDTO userDTO);
    UserDTO findUserProfile(String userId);
    void deactivateUser(Long userIdx);
    Optional<User> getCurrentUser();

    void grantAdminRole(Long userId);
}
