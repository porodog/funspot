package com.spot.fun.usr.custom.dto;

import com.spot.fun.paging.ScrollPagingUtil;
import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WishListDTO extends ScrollPagingUtil {
  private Long id;

  private Long customCno;
  private String title;

  private Long userIdx;

  private List<WishListDTO> wishList;
  private boolean hasNext;

}
