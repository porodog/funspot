package com.spot.fun.usr.feed.dto.comment;

import com.spot.fun.usr.feed.dto.FeedDTO;
import com.spot.fun.usr.user.dto.profile.UserProfileResponseDTO;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

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
  //private UserDTO user;
  private String regDateStr;
  private Long userIdx;
  private String userId;
  private Boolean likedYn;
  private Long parentIdx;
  private Boolean parentDelYn;
  private Long feedIdx;
  private Boolean feedDelYn;
  private List<FeedCommentDTO> replyList;

  private UserProfileResponseDTO user;

  public FeedCommentDTO(Long idx, String content, Long parentIdx, Boolean parentDelYn, Long feedIdx, Boolean feedDelYn) {
    this.idx = idx;
    this.content = content;
    this.parentIdx = parentIdx;
    this.parentDelYn = parentDelYn;
    this.feedIdx = feedIdx;
    this.feedDelYn = feedDelYn;
  }
}
