package com.spot.fun.usr.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class BoardDTO {
  private Long idx;
  private String title;
  private String content;
  private String nickname;
  private String regDate; // 포맷팅된 등록일
  private String modDate; // 포맷팅된 수정일
  private long commentCount; // 댓글 수
  private long likeCount; // 추천 수
  private long viewCount; // 조회 수
}