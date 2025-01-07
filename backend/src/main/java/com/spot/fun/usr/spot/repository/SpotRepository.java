package com.spot.fun.usr.spot.repository;

import com.spot.fun.usr.spot.entity.Spot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpotRepository extends JpaRepository<Spot, Long> {
  Spot findAllBySpotId(Long spotId);
  boolean existsBySpotId(Long spotId);
  boolean existsByContentId(Long contentId);
  Optional<Spot> findByContentId(Long contentId);

}
