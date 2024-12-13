package com.spot.fun.usr.board.controller;

import com.spot.fun.config.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
  private final JwtTokenProvider jwtTokenProvider;

  @PostMapping("/validate")
  public ResponseEntity<?> validateToken(@RequestBody Map<String, String> request) {
    String token = request.get("token");
    if (jwtTokenProvider.validToken(token)) {
      return ResponseEntity.ok().build();
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
  }
}