package com.spot.fun.config.jwt;

import com.spot.fun.token.util.AuthTokenUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Log4j2
@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;
//    private final static String HEADER_AUTHORIZATION = "Authorization";
//    private final static String TOKEN_PREFIX = "Bearer";

    @Value("${security.check.path.none}")
    private String[] PERMITTED_PATHS;
    private final AntPathMatcher antPathMatcher = new AntPathMatcher();

    private final AuthTokenUtil authTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String requestUri = request.getRequestURI();

        // PERMITTED_PATHS에 포함된 경로는 JWT 토큰 검사 건너뛰기
        if (!requestUri.startsWith("/api") || isPermittedPath(requestUri)) {
//            log.info("Skipping JWT validation for permitted path: {}", requestUri);
            filterChain.doFilter(request, response);
            return;
        }

        // 토큰 가져오기
        String accessToken = authTokenUtil.getTokenValue(request, "access_token");

        // 토큰이 존재하고 유효한 경우 인증 설정
        if (accessToken != null && jwtTokenProvider.validToken(accessToken)) {
            log.info("Valid token found for request URI: {}", requestUri);
            Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } else {
            log.warn("Invalid or missing token for request URI: {}", requestUri);
        }

        filterChain.doFilter(request, response);
    }

//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        String requestUri = request.getRequestURI();
//
//        if (isPermittedPath(requestUri)) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String accessToken = authTokenUtil.getTokenValue(request, "access_token");
//
//        if (accessToken != null && jwtTokenProvider.validToken(accessToken)) {
//            Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
//
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//
//            // 관리자 권한 확인
//            String role = authentication.getAuthorities().stream()
//                    .findFirst()
//                    .map(Object::toString)
//                    .orElse("UNKNOWN");
//
//            if ("ADMIN".equalsIgnoreCase(role)) {
//                log.info("Admin access granted for request URI: {}", requestUri);
//            } else {
//                log.info("Non-admin user access for request URI: {}", requestUri);
//            }
//        } else {
//            log.warn("Invalid or missing token for request URI: {}", requestUri);
//        }
//
//        filterChain.doFilter(request, response);
//    }



//    private String getAccessToken(String authorizationHeader) {
//        if (authorizationHeader != null && authorizationHeader.startsWith(TOKEN_PREFIX)) {
//            return authorizationHeader.substring(TOKEN_PREFIX.length());
//        }
//        return null;
//    }

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
