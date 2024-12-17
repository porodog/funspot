package com.spot.fun.usr.oauthlogin.utill;

import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;

public class CustomOAuth2AuthenticationException extends OAuth2AuthenticationException {

  public CustomOAuth2AuthenticationException(String errorMessage) {
    super(new OAuth2Error("invalid_provider", errorMessage, null));
  }

  @Override
  public String getMessage() {
    return super.getError().getDescription();
  }
}
