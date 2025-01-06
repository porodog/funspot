package com.spot.fun.config;

import com.spot.fun.config.jwt.JwtTokenFilter;
import com.spot.fun.config.jwt.JwtTokenProvider;
import com.spot.fun.token.entity.AuthToken;
import com.spot.fun.token.repository.AuthTokenRepository;
import com.spot.fun.token.util.AuthTokenUtil;
import com.spot.fun.usr.oauthlogin.service.CustomOAuth2UserService;
import com.spot.fun.usr.oauthlogin.utill.CustomOAuth2AuthenticationException;
import com.spot.fun.usr.oauthlogin.utill.CustomRequestEntityConverter;
import com.spot.fun.usr.user.entity.User;
import com.spot.fun.usr.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientProvider;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientProviderBuilder;
import org.springframework.security.oauth2.client.endpoint.DefaultAuthorizationCodeTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Log4j2
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtTokenFilter jwtTokenFilter;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthTokenUtil authTokenUtil;
    private final AuthTokenRepository authTokenRepository;

//    @Value("${security.check.path.none}")
//    private String[] PERMITTED_PATHS;

    @Value("${server.host.url}")
    private String serverUrl;
//    private String serverUrl="http://localhost:3000"; // 로컬에서 테스트할때 사용 (oauth 로그인 리디렉트)

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception  {
        return http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/admin/**").hasAuthority("ADMIN")
                        .requestMatchers("/api/usr/mypage/**").hasAuthority("USER")

                        // 여기서 쓰면 안됨
//                        .requestMatchers("/api/usr/course/**").permitAll()
//                        .requestMatchers("/api/usr/places/**").permitAll()
//                        .requestMatchers("/api/usr/oauth/get-oauth-session").permitAll()
//                        .requestMatchers("/api/boards/**", "/api/comments").permitAll() // 게시판 관련 경로 인증 없이 허용
//                        .requestMatchers("/api/boards/**").permitAll()
//                        .requestMatchers("/api/comments/**").permitAll() // 게시판 관련 경로 인증 없이 허용
//                        .requestMatchers("/uploads/**").permitAll() // 이미지 업로드 경로 인증 없이 허용
                        //
                        .requestMatchers("/**").permitAll()
                        .anyRequest().authenticated()
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))  // CORS 설정
                .csrf(csrf -> csrf.disable())  // CSRF 비활성화
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션방식 -> JWT 사용
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/oauth/login/**")
                        .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService))  // OAuth2 로그인 설정
                        .tokenEndpoint(tokenEndpoint -> tokenEndpoint
                                .accessTokenResponseClient(accessTokenResponseClient()) // Kakao 토큰 요청 처리
                        )
                        .successHandler(oAuth2AuthenticationSuccessHandler())  // 로그인 성공 시 동작
                        .failureHandler(oAuth2AuthenticationFailureHandler()))  // 로그인 실패 시 동작
                .build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // 허용하는 Origin 설정
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("funspot.store");
        configuration.addAllowedOrigin(serverUrl);

        // 허용할 HTTP 메서드 추가 (PATCH, DELETE, OPTIONS 등)
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));

        // 허용할 HTTP 헤더 설정
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));

        // 인증 정보 허용
        configuration.setAllowCredentials(true);

        // 모든 경로에 대해 CORS 정책 적용
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 모든경로에 대하여 위 설정을 적용

        return source;
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public OAuth2AuthorizedClientManager authorizedClientManager(
            ClientRegistrationRepository clientRegistrationRepository,
            OAuth2AuthorizedClientRepository authorizedClientRepository) {

        OAuth2AuthorizedClientProvider authorizedClientProvider =
                OAuth2AuthorizedClientProviderBuilder.builder()
                        .authorizationCode()
                        .refreshToken()
                        .clientCredentials()
                        .build();

        DefaultOAuth2AuthorizedClientManager authorizedClientManager =
                new DefaultOAuth2AuthorizedClientManager(clientRegistrationRepository, authorizedClientRepository);
        authorizedClientManager.setAuthorizedClientProvider(authorizedClientProvider);

        return authorizedClientManager;
    }

    @Bean
    public OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> accessTokenResponseClient() {
        DefaultAuthorizationCodeTokenResponseClient tokenResponseClient =
                new DefaultAuthorizationCodeTokenResponseClient();
        tokenResponseClient.setRequestEntityConverter(new CustomRequestEntityConverter());
        return tokenResponseClient;
    }


    // OAuth2 로그인 실패 핸들러
    @Bean
    public AuthenticationFailureHandler oAuth2AuthenticationFailureHandler() {
        return (request, response, exception) -> {
            String errorMessage;

            if (exception instanceof CustomOAuth2AuthenticationException) {
                errorMessage = exception.getMessage(); // 커스텀 예외 메시지
            } else if (exception instanceof OAuth2AuthenticationException) {
                OAuth2Error error = ((OAuth2AuthenticationException) exception).getError();
                errorMessage = error.getDescription();
            } else {
                errorMessage = "소셜 로그인에 실패했습니다. 다시 시도해주세요.";
            }

            log.error("OAuth2 Authentication failed: {}", errorMessage);

            // URL 파라미터로 에러 메시지 전달
            response.sendRedirect(serverUrl+"/login?error_message=" + URLEncoder.encode(errorMessage, "UTF-8"));
        };
    }



    // OAuth2 로그인 성공 핸들러
    @Bean
    public SimpleUrlAuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
        return new SimpleUrlAuthenticationSuccessHandler() {
            @Override
            protected void handle(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
                DefaultOAuth2User oAuth2User = (DefaultOAuth2User) authentication.getPrincipal();
                log.info("OAuth2 Success Handler - User Attributes: {}", oAuth2User.getAttributes());
                Map<String, Object> attributes = new HashMap<>(oAuth2User.getAttributes()); // 수정 가능 Map으로 변환
                String email = (String) attributes.get("email");

                if (email == null) {
                    log.error("OAuth2 Success Handler - Email is null, redirecting to error page.");
                    response.sendRedirect(serverUrl+"/login-error");
                    return;
                }

                log.info("OAuth2 Success Handler - Email: {}", email);

                Optional<User> userOptional = userRepository.findByEmail(email);
                if (userOptional.isPresent()) {
                    // 기존 사용자: JWT 생성 후 로그인 성공 페이지로 리다이렉트
                    User user = userOptional.get();
                    String accessToken = jwtTokenProvider.generateAccessToken(user);
                    String refreshToken;

                    // Refresh Token이 이미 존재하면 가져오고, 없으면 생성
                    Optional<AuthToken> existingToken = authTokenRepository.findByUserIdx(user.getIdx());
                    if (existingToken.isPresent()) {
                        refreshToken = existingToken.get().getRefreshToken(); // 기존 토큰 사용
                        log.info("Using existing refresh token for user: {}", email);
                    } else {
                        refreshToken = jwtTokenProvider.generateRefreshToken(user); // 새 토큰 생성
                        AuthToken authToken = AuthToken.builder()
                                .userIdx(user.getIdx())
                                .refreshToken(refreshToken)
                                .build();
                        authTokenRepository.save(authToken); // 데이터베이스에 저장
                        log.info("Created new refresh token for user: {}", email);
                    }

                    // 쿠키 생성
                    authTokenUtil.makeAccessToken(response, accessToken);
                    authTokenUtil.makeRefreshToken(response, refreshToken);

                    log.info("프론트엔드의 login-success 페이지로 리다이렉트...");
                    log.info("Redirecting to login-success");
                    response.sendRedirect(serverUrl+"/login-success");
                } else {
                    // 비회원: 회원가입 페이지로 리다이렉트
                    log.info("Redirecting to social-signup for new user: {}", email);
                    response.sendRedirect(serverUrl+"/social-signup");
                }
            }
        };
    }
}
