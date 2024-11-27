package com.spot.fun.usr.signup.service;


import com.spot.fun.usr.user.dto.UserDTO;
import com.spot.fun.usr.user.dto.UserRole;
import com.spot.fun.usr.user.entity.User;
import com.spot.fun.usr.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class SignupServiceImpl implements SignupService {
  private final UserRepository userRepository;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  @Override
  public void signup(UserDTO userDTO) {
    log.info("sign up !!!!!!!!!!!!!!!!!!!!!!!!");
    log.info(userDTO.toString());


    // 유효성 검사: 중복된 userId, email, nickname, phone 체크
    if (userRepository.existsByUserId(userDTO.getUserId())) {
      throw new IllegalArgumentException("UserId is already taken");
    }
    if (userRepository.existsByEmail(userDTO.getEmail())) {
      throw new IllegalArgumentException("Email is already registered");
    }
    if (userRepository.existsByNickname(userDTO.getNickname())) {
      throw new IllegalArgumentException("Nickname is already in use");
    }
    if (userRepository.existsByPhone(userDTO.getPhone())) {
      throw new IllegalArgumentException("Phone number is already registered");
    }

    User user = User.builder()
            .userId(userDTO.getUserId())
            .password(bCryptPasswordEncoder.encode(userDTO.getPassword()))
            .name(userDTO.getName())
            .birthDate(userDTO.getBirthDate())
            .nickname(userDTO.getNickname())
            .email(userDTO.getEmail())
            .phone(userDTO.getPhone())
            .zonecode(userDTO.getZonecode())
            .address(userDTO.getAddress())
            .detaileAdd(userDTO.getDetaileAdd())
            .userRole(UserRole.ROLE_USER) // 권한 고정
            .build();

    userRepository.save(user);
  }

}
