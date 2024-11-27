package com.spot.fun.usr.feed.dto;

import com.spot.fun.usr.feed.entity.Feed;
import com.spot.fun.usr.feed.entity.FeedComment;
import com.spot.fun.usr.user.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class FeedCommentDTO {
  private Long idx;
  private String content;
  private Boolean delYn;
  private LocalDateTime regDate;
  private Feed feed;
  private User user;

  public FeedComment toEntity() {
    return FeedComment.builder()
            .content(this.content)
            .delYn(this.delYn)
            .regDate(this.regDate)
            .build();
  }
}
