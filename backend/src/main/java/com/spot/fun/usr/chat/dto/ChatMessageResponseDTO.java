package com.spot.fun.usr.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@ToString
public class ChatMessageResponseDTO{
  private Long fromIdx;
  private String msg;
  //private java.sql.Timestamp timestamp;
  private LocalDateTime timestamp;
  private boolean isRead;  // isRead 필드 추가

  public ChatMessageResponseDTO(Long fromIdx, String msg,
                                //java.sql.Timestamp timestamp,
                                LocalDateTime timestamp,
                                boolean isRead) {
    this.fromIdx = fromIdx;
    this.msg = msg;
    this.timestamp = timestamp;
    this.isRead = isRead;
  }
}
