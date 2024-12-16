package com.spot.fun.usr.oauthlogin.exception;

public class AuthHandler extends RuntimeException {
  public AuthHandler(String message) {
    super(message);
  }

  public AuthHandler(ErrorStatus errorStatus) {
    super(errorStatus.getMessage());
  }
}
