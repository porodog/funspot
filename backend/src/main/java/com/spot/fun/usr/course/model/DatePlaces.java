package com.spot.fun.usr.course.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class DatePlaces {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;         // 장소 이름
  private String description;  // 설명
  private Double latitude;     // 위도
  private Double longitude;    // 경도

  // Getters and Setters
}
