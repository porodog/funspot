package com.spot.fun.usr.spot.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class SpotListResponseDTO {
  private Long spotId;
  private String addr;
  private String category;
  private String contentType;
  private String firstImage;
  private String firstImage2;
  private String tel;
  private String title;

  @Builder
  public SpotListResponseDTO(Long spotId, String addr, String category, String contentType, String firstImage, String firstImage2, String tel, String title){
    this.spotId = spotId;
    this.addr = addr;
    this.category = category;
    this.contentType = contentType;
    this.firstImage = firstImage;
    this.firstImage2 = firstImage2;
    this.tel = tel;
    this.title = title;
  }
}
