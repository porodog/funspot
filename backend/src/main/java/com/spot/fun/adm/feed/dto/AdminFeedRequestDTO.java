package com.spot.fun.adm.feed.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminFeedRequestDTO {
  private Long idx;

  private String searchType;
  private String searchValue;

  private int page = 1;
  private int size = 10;
}
