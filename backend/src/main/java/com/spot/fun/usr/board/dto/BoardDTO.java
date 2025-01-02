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
    private Long authorIdx; // 작성자 userIdx
    private String profileImage; // 프로필 이미지
    private String regDate;
    private String modDate;
    private Long commentCount;
    private Long likeCount;
    private Long viewCount;
  }
