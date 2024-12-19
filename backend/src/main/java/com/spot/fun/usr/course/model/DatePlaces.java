package com.spot.fun.usr.course.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

@Getter
@Setter
@Entity
public class DatePlaces {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  private String name;         // 장소 이름

  private String description;  // 설명
  private Double latitude;     // 위도
  private Double longitude;    // 경도

  private String cost;  // 예상 가격
  private String time;  // 소요 시간
  // Getters and Setters
}
