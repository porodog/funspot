package com.spot.fun.usr.spot.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class SpotItemResponseDTO {
  private Long spotId;
  private Long contentId;
  private String addr1;
  private String addr2;
  private String area;
  private String cat1;
  private String cat2;
  private String cat3;
  private String contentType;
  private String firstImage;
  private String firstImage2;
  private double mapX;
  private double mapY;
  private Long mLevel;
  private String sigungu;
  private String tel;
  private String title;

  @Builder
  public SpotItemResponseDTO(Long spotId, Long contentId, String addr1, String addr2, String area,
                             String cat1, String cat2, String cat3, String contentType, String firstImage, String firstImage2,
                             double mapX, double mapY, Long mLevel, String sigungu, String tel, String title){
    this.spotId = spotId;
    this.contentId = contentId;
    this.addr1 = addr1;
    this.addr2 = addr2;
    this.area = area;
    this.cat1 = cat1;
    this.cat2 = cat2;
    this.cat3 = cat3;
    this.contentType = contentType;
    this.firstImage = firstImage;
    this.firstImage2 = firstImage2;
    this.mapX = mapX;
    this.mapY = mapY;
    this.mLevel = mLevel;
    this.sigungu = sigungu;
    this.tel = tel;
    this.title = title;
  }
}
