package com.spot.fun.usr.spot.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class SpotPostRequestDTO {
  private Long userIdx;
  private Long spotId;
  private Long contentId;
  private String addr1;
  private String addr2;
  private String areaCode;
  private String areaCodeName;  // 추가
  private String cat1;
  private String cat1Name;      // 추가
  private String cat2;
  private String cat2Name;      // 추가
  private String cat3;
  private String cat3Name;      // 추가
  private Long contentTypeId;
  private String contentTypeIdName;  // 추가
  private Long createdTime;
  private String firstImage;
  private String firstImage2;
  private String cpyrhtDivCd;
  private double mapX;
  private double mapY;
  private Long mlevel;
  private Long modifiedTime;
  private Long sigunguCode;
  private String sigunguCodeName;    // 추가
  private String tel;
  private String title;

  @Builder
  public SpotPostRequestDTO(Long spotId, Long contentId, String addr1, String addr2,
                            String areaCode, String areaCodeName,
                            String cat1, String cat1Name,
                            String cat2, String cat2Name,
                            String cat3, String cat3Name,
                            Long contentTypeId, String contentTypeIdName,
                            Long createdTime, String firstImage, String firstImage2,
                            String cpyrhtDivCd, double mapX, double mapY, Long mlevel,
                            Long modifiedTime, Long sigunguCode, String sigunguCodeName,
                            String tel, String title) {
    this.spotId = spotId;
    this.contentId = contentId;
    this.addr1 = addr1;
    this.addr2 = addr2;
    this.areaCode = areaCode;
    this.areaCodeName = areaCodeName;
    this.cat1 = cat1;
    this.cat1Name = cat1Name;
    this.cat2 = cat2;
    this.cat2Name = cat2Name;
    this.cat3 = cat3;
    this.cat3Name = cat3Name;
    this.contentTypeId = contentTypeId;
    this.contentTypeIdName = contentTypeIdName;
    this.createdTime = createdTime;
    this.firstImage = firstImage;
    this.firstImage2 = firstImage2;
    this.cpyrhtDivCd = cpyrhtDivCd;
    this.mapX = mapX;
    this.mapY = mapY;
    this.mlevel = mlevel;
    this.modifiedTime = modifiedTime;
    this.sigunguCode = sigunguCode;
    this.sigunguCodeName = sigunguCodeName;
    this.tel = tel;
    this.title = title;
  }
}