package com.spot.fun.config.jwt;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
@RequiredArgsConstructor
public class JwtTokenUtil {
    private final JwtTokenProvider jwtTokenProvider;

    public static String getJwtToken() {
//        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
//        if (attributes != null) {
//            String bearerToken = attributes.getRequest().getHeader(HEADER_AUTHORIZATION);
//            if (!StringUtils.isBlank(bearerToken) && bearerToken.startsWith(TOKEN_PREFIX)) {
//                bearerToken = bearerToken.substring(TOKEN_PREFIX.length());
//                return !StringUtils.isBlank(bearerToken)?bearerToken:null;
//            }
//        }
        return null;
    }



}
