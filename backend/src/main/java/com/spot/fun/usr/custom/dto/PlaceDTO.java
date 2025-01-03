package com.spot.fun.usr.custom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;

@Data
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlaceDTO {
  private Long id;
  private String name;
  private String address;
  private Double latitude;
  private Double longitude;
  private String description;
  private Integer estimatedCost;
  private Integer durationMinutes;
  private String category;
  private String simpleAddress;
  @Size(max = 1024)
  private String image;
  
}
