package com.spot.fun.usr.mypage.dto;

import com.spot.fun.paging.ScrollPagingUtil;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentRequestDTO extends ScrollPagingUtil {
  private Long userIdx;

  private Long commentIdx;
}
