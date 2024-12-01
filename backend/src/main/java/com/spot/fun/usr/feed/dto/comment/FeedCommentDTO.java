package com.spot.fun.usr.feed.dto.comment;

import com.spot.fun.usr.feed.dto.FeedDTO;
import com.spot.fun.usr.feed.entity.comment.FeedComment;
import com.spot.fun.usr.user.dto.UserDTO;
import lombok.*;

import java.time.LocalDateTime;

//@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedCommentDTO {
  private Long idx;
  private String content;
  private Boolean delYn;
  private LocalDateTime regDate;

  private FeedDTO feedDTO;
  private UserDTO userDTO;
  private String regDateStr;
  private Long userIdx;

  public FeedComment toEntity() {
    return FeedComment.builder()
            .content(this.content)
            .delYn(this.delYn)
            .regDate(this.regDate)
            .build();
  }
}
