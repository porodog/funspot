package com.spot.fun.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.security.Principal;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker // 웹소켓 메시지 핸들링 활성화
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    // stomp 접속 주소 url = ws://localhost:8080/ws, 프로토콜이 http가 아니다!
    registry.addEndpoint("/ws")
            .setAllowedOrigins("http://localhost:3000")
            .withSockJS(); //버전 낮은 브라우저에서도 적용 가능(SockJS가 그렇게 만들어준다는 듯?)
  }

  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    // 메시지 구독 채널을 단일 채널로 설정
    // 1번과 2번 사용자의 채팅방이라고 가정했을 때,
    // 1번 사용자는 /sub/roomId/2를 구독하고 1에 브로드캐스팅
    // 2번 사용자는 /sub/roomId/1를 구독하고 2에 브로드캐스팅하면 됨
    registry.enableSimpleBroker("/sub/roomId");
//    registry.enableSimpleBroker("/sub/user", "/sub/other");   // 메시지를 구독(수신)하는 요청 엔드포인트
    registry.setApplicationDestinationPrefixes("/pub");   // 메시지를 발행(송신)하는 엔드포인트
  }

  @Override
  public void configureClientInboundChannel(ChannelRegistration registration) {
    registration.interceptors(new ChannelInterceptor() {
      @Override
      public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(
                message, StompHeaderAccessor.class);

        if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
          String userIdx = accessor.getFirstNativeHeader("userIdx");
          if (userIdx != null) {
            accessor.setUser(new Principal() {
              @Override
              public String getName() {
                return userIdx;
              }
            });
          }
        }
        return message;
      }
    });
  }
}
