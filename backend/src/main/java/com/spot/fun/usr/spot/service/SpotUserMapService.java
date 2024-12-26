package com.spot.fun.usr.spot.service;

import com.spot.fun.usr.spot.repository.SpotUserMapRepository;
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
}
