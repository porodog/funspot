package com.spot.fun.config.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;
    private final static String HEADER_AUTHORIZATION = "Authorization";
    private final static String TOKEN_PREFIX = "Bearer";

    @Value("${security.check.path.none}")
    private String[] PERMITTED_PATHS;
    private final AntPathMatcher antPathMatcher = new AntPathMatcher();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // PERMITTED_PATHS에 포함된 경로는 JWT 토큰 검사 건너뛰기
        if (isPermittedPath(request.getRequestURI())) {
            filterChain.doFilter(request, response);
            return;
        }

        String authorizationHeader = request.getHeader(HEADER_AUTHORIZATION);
        String accessToken = getAccessToken(authorizationHeader);
        if (jwtTokenProvider.validToken(accessToken)) {
            Authentication authenciation = jwtTokenProvider.getAuthentication(accessToken);
            SecurityContextHolder.getContext().setAuthentication(authenciation);
        }
        filterChain.doFilter(request, response);
    }

    private String getAccessToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith(TOKEN_PREFIX)) {
            return authorizationHeader.substring(TOKEN_PREFIX.length());
        }
        return null;
    }

    private boolean isPermittedPath(String requestURI) {
        // PERMITTED_PATHS 배열을 순회하며, 요청 URI가 허용된 경로인지 확인
        for (String permittedPath : PERMITTED_PATHS) {
            if (antPathMatcher.match(permittedPath, requestURI)) {
                return true;
            }
        }
        return false;
    }
}
