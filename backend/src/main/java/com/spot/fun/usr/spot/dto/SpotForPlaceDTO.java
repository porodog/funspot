package com.spot.fun.usr.spot.dto;

import jakarta.persistence.Column;
import lombok.*;

import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class SpotForPlaceDTO {
  private Long id;
  private String address;
  private String category;
  private String description;
  private int durationMinutes;
  private int estimatedCost;
  private double latitude;
  private double longitude;
  private String name;
  private String simpleAddress;
  @Column(length = 1024)
  private String image;

  @Builder
  public SpotForPlaceDTO(Long id, String address, String category, String description, int durationMinutes, int estimatedCost, double latitude, double longitude, String name, String simpleAddress, String image) {
    this.id = id;
    this.address = address;
    this.category = category;
    this.description = description;
    this.durationMinutes = durationMinutes;
    this.estimatedCost = estimatedCost;
    this.latitude = latitude;
    this.longitude = longitude;
    this.name = name;
    this.simpleAddress = simpleAddress;
    this.image = image;
  }
}
