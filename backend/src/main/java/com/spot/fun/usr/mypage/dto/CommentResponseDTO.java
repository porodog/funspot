package com.spot.fun.usr.mypage.dto;

import com.spot.fun.usr.feed.dto.FeedDTO;
import com.spot.fun.usr.feed.dto.comment.FeedCommentDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponseDTO {
  private boolean hasNext;

  private Long commentIdx;
  private List<FeedCommentDTO> feedCommentList;
}
