package com.spot.fun.usr.spot.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name="tbl_spot_user_map")
public class SpotUserMap {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "map_id", unique = true, updatable = false, nullable = false)
  private Long mapId;

  @Column(name = "spot_id", nullable = false)
  private Long spotId;

  @Column(name = "user_idx", nullable = false)
  private Long userIdx;

  @Builder
  public SpotUserMap(Long mapId, Long spotIdx, Long userIdx) {
    this.mapId = mapId;
    this.spotId = spotIdx;
    this.userIdx = userIdx;
  }
}
