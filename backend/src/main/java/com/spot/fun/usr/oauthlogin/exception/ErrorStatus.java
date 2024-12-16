package com.spot.fun.usr.oauthlogin.exception;

public enum ErrorStatus {
  _PARSING_ERROR("JSON parsing error occurred"),
  _INVALID_TOKEN("Invalid token");

  private final String message;

  ErrorStatus(String message) {
    this.message = message;
  }

  public String getMessage() {
    return message;
  }
}