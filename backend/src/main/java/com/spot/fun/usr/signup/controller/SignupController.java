package com.spot.fun.usr.signup.controller;


import com.spot.fun.usr.signup.service.SignupService;
import com.spot.fun.usr.user.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usr/signup")
@RequiredArgsConstructor
public class SignupController {
  private final SignupService signupService;

  @PostMapping("/signup")
  public ResponseEntity<String> signup(@RequestBody UserDTO userDTO){
    signupService.signup(userDTO);
    return ResponseEntity.ok("회원가입 성공");
  }
}
