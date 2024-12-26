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
  private String cat1;
  private String cat2;
  private String cat3;
  private Long contentTypeId;
  private Long createdTime;
  private String firstImage;  // 대표이미지(원본)
  private String firstImage2; // 대표이미지(썸네일)
  private String cpyrhtDivCd; // 저작권유형
  private double mapX; // GPS X좌표
  private double mapY; // GPS Y좌표
  private Long mlevel; // Map Level (리스폰스에 있길래 넣긴 하지만 이게 뭐지? 층수인가?)
  private Long modifiedTime; // 수정일
  private Long sigunguCode; // 시군구 코드
  private String tel; // 전화번호
  private String title; // 제목

  @Builder
  public SpotPostRequestDTO(Long spotId, Long contentId, String addr1, String addr2, String areaCode, String cat1, String cat2, String cat3, Long contentTypeId, Long createdTime,
              String firstImage, String firstImage2, String cpyrhtDivCd, double mapX, double mapY, Long mlevel, Long modifiedTime, Long sigunguCode, String tel, String title){
    this.spotId = spotId;
    this.contentId = contentId;
    this.addr1 = addr1;
    this.addr2 = addr2;
    this.areaCode = areaCode;
    this.cat1 = cat1;
    this.cat2 = cat2;
    this.cat3 = cat3;
    this.contentTypeId = contentTypeId;
    this.createdTime = createdTime;
    this.firstImage = firstImage;
    this.firstImage2 = firstImage2;
    this.cpyrhtDivCd = cpyrhtDivCd;
    this.mapX = mapX;
    this.mapY = mapY;
    this.mlevel = mlevel;
    this.modifiedTime = modifiedTime;
    this.sigunguCode = sigunguCode;
    this.tel = tel;
    this.title = title;
  }
}
