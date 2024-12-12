package com.spot.fun.usr.user.dto.profile;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileRequestDTO {
  private Long userIdx;
  private String nickname;
  private String description;

  private String originName;
  private String uploadName;
  private Boolean imageDelete;
  private MultipartFile imageFile;
}
