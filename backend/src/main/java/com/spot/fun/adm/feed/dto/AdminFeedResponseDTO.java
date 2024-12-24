package com.spot.fun.adm.feed.dto;

import com.spot.fun.usr.feed.dto.FeedDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminFeedResponseDTO {
  private List<FeedDTO> list;
  private FeedDTO detail;
  private Long idx;
}
