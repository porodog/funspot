package com.spot.fun.sample.service.impl;

import com.spot.fun.sample.dto.UserDTO;
import com.spot.fun.sample.repository.UserRepository;
import com.spot.fun.sample.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bcryptPasswordEncoder;

    @Override
    public UserDTO findByIdx(Long idx) {
        return userRepository.findByIdx(idx)
                .orElseThrow(IllegalArgumentException::new)
                .toDTO();
    }

    @Override
    public UserDTO findByUserId(String userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(IllegalArgumentException::new)
                .toDTO();
    }
}
