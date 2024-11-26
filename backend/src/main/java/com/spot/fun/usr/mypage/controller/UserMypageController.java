package com.spot.fun.usr.mypage.controller;

import com.spot.fun.usr.mypage.service.UserMypageService;
import com.spot.fun.usr.user.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/usr/mypage")
public class UserMypageController {
    private final UserMypageService userMypageService;

    @GetMapping("/info")
    public UserDTO info() {
        return userMypageService.findByIdx();
    }
}
