package com.spot.fun.usr.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@NoArgsConstructor
@ToString
public class ChatMessageResponseDTO{
  private boolean isMine;
  private String msg;
  private java.sql.Timestamp timestamp;

  public ChatMessageResponseDTO(boolean isMine, String msg, java.sql.Timestamp timestamp) {
    this.isMine = isMine;
    this.msg = msg;
    this.timestamp = timestamp;
  }
}
