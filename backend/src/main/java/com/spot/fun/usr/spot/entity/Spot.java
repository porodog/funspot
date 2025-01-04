package com.spot.fun.usr.spot.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name="tbl_spot")
public class Spot {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "spot_id", unique = true, updatable = false, nullable = false)
  private Long spotId;    // funspot 테이블 id

  @Column(name = "content_id", unique = true, nullable = false)
  private Long contentId; // TourAPI의 contentId

  @Column(name = "addr1")
  private String addr1;   // 주소

  @Column(name = "addr2")
  private String addr2;   // 상세주소

  @Column(name = "areacode")
  private String areaCode;  // 지역 코드

  @Column(name = "areacode_name")
  private String areaCodeName;  // 지역 코드

  @Column(name = "cat1")    // 대분류
  private String cat1;

  @Column(name = "cat1_name")
  private String cat1Name;

  @Column(name = "cat2")
  private String cat2;    // 중분류

  @Column(name = "cat2_name")
  private String cat2Name;

  @Column(name = "cat3")
  private String cat3;    // 소분류

  @Column(name = "cat3_name")
  private String cat3Name;

  @Column(name = "content_type_id", nullable = false)
  private Long contentTypeId; // 콘텐츠타입 ID (관광지, 숙박, 음식점 ...)

  @Column(name = "content_type_id_name", nullable = false)
  private String contentTypeIdName;

  @Column(name = "createdtime", nullable = false)
  private Long createdTime; // 등록일

  @Column(name = "firstimage")
  private String firstImage;  // 대표이미지(원본)

  @Column(name = "firstimage2")
  private String firstImage2; // 대표이미지(썸네일)

  @Column(name = "cpyrht_div_cd")
  private String cpyrhtDivCd; // 저작권유형

  @Column(name = "map_x")
  private double mapX; // GPS X좌표

  @Column(name = "map_y")
  private double mapY; // GPS Y좌표

  @Column(name = "mlevel")
  private Long mlevel; // Map Level (리스폰스에 있길래 넣긴 하지만 이게 뭐지? 층수인가?)

  @Column(name = "modifiedtime", nullable = false)
  private Long modifiedTime; // 수정일

  @Column(name = "sigungu_code")
  private Long sigunguCode; // 시군구 코드

  @Column(name = "sigungu_code_name")
  private String sigunguCodeName;

  @Column(name = "tel")
  private String tel; // 전화번호

  @Column(name = "title", nullable = false)
  private String title; // 제목

  @Builder
  public Spot(Long spotId, Long contentId, String addr1, String addr2, String areaCode,String areaCodeName,
              String cat1, String cat1Name, String cat2, String cat2Name, String cat3,
              String cat3Name, Long contentTypeId, String contentTypeIdName, Long createdTime,
              String firstImage, String firstImage2, String cpyrhtDivCd, double mapX, double mapY,
              Long mlevel, Long modifiedTime, Long sigunguCode, String sigunguCodeName,String tel, String title){
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
