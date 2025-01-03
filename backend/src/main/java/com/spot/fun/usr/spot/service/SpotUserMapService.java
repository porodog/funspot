package com.spot.fun.usr.spot.service;

import com.spot.fun.usr.spot.entity.SpotUserMap;
import com.spot.fun.usr.spot.repository.SpotUserMapRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SpotUserMapService {
  private final SpotUserMapRepository spotUserMapRepository;

  public List<Long> getSpotIdList(Long userIdx){
    return spotUserMapRepository.findSpotIdsByUserIdx(userIdx);
  }

  public boolean existsSpotIdsByUserIdx(Long userIdx, Long spotId){
    return spotUserMapRepository.existsSpotByUserIdxAndSpotId(userIdx, spotId);
  }

  @Transactional
  public void saveSpotUserMap(Long spotId, Long userIdx) {
    SpotUserMap spotUserMap = SpotUserMap.builder()
            .spotIdx(spotId)
            .userIdx(userIdx)
            .build();

    spotUserMapRepository.save(spotUserMap);
  }
}
