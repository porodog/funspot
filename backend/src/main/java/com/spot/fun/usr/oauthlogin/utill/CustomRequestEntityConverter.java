package com.spot.fun.usr.oauthlogin.utill;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequestEntityConverter;
import org.springframework.util.MultiValueMap;



public class CustomRequestEntityConverter extends OAuth2AuthorizationCodeGrantRequestEntityConverter {

  @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
  private String clientSecret;

  @Override
  public RequestEntity<?> convert(OAuth2AuthorizationCodeGrantRequest authorizationGrantRequest) {

    RequestEntity<?> requestEntity = super.convert(authorizationGrantRequest);
    MultiValueMap<String, String> body = (MultiValueMap<String, String>) requestEntity.getBody();

    // Kakao는 client_secret을 body에 추가해야 함
    body.add("client_secret", clientSecret);

    HttpHeaders headers = new HttpHeaders();
    headers.setAll(requestEntity.getHeaders().toSingleValueMap());

    return new RequestEntity<>(body, headers, HttpMethod.POST, requestEntity.getUrl());
  }
}
