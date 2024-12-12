package com.spot.fun.usr.user.dto.profile;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDTO {
  private Long userIdx;
  private String uploadName;
  private String originName;
  private String description;
}
