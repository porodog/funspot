package com.spot.fun.usr.spot.service;

import com.spot.fun.usr.spot.dto.SpotItemResponseDTO;
import com.spot.fun.usr.spot.dto.SpotListResponseDTO;
import com.spot.fun.usr.spot.dto.SpotPostRequestDTO;
import com.spot.fun.usr.spot.entity.Spot;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SpotFacadeService {
  private final SpotUserMapService spotUserMapService;
  private final SpotService spotService;


  // userIdx로 내 스팟 조회를 하려면 매퍼테이블이 있어야댐....
  public List<SpotListResponseDTO> getSpotList(Long userIdx) {
    // 1. userIdx로 spotId 리스트를 추출한다 (SpotUserMapService)
    // 2. spotId 리스트를 순회하는데,..(SpotFacadeService)
    // 2-1. spotId에 해당하는 Spot entity를 추출한다(SpotService)
    // 2-2. Spot entity를 SpotListResponseDTO로 재구성하고 반환한다(SpotService)
    // 2-3. SpotService에서 받은 SpotListResponseDTO를 List에 넣는다.
    // 3. List<SpotListResponseDTO>를 반환한다.

    List<Long> spotIdList = spotUserMapService.getSpotIdList(userIdx);

    return spotIdList.stream()
            .map(spotId -> {
              Spot spot = spotService.getSpot(spotId);
              return spotService.setSpotListResponseDTO(spot);
            }).collect(Collectors.toList());
  }

  public SpotItemResponseDTO getSpotItem(Long spotId) {
    // 내 스팟 아이템 조회(생각해보니 userIdx가 필요한 이유가 없지않냐?)
    // 1. Long spotId로 Spot entity 추출(SpotService)
    // 2. 추출한 Spot entity를 SpotItemResponseDTO로 재구성(SpotService)
    // 3. 반환

    Spot spot = spotService.getSpot(spotId);
    return spotService.setSpotItemResponseDTO(spot);
  }

  public String postSpot(SpotPostRequestDTO spotPostRequestDTO) {
    // 내 스팟에 담기
    // 0. SpotUserMap 테이블에 spotPostRequestDTO.spotId && spotPostRequestDTO.userIdx가 있는지 확인(SpotUserMapService)
    // 0-1. 만약 있다면 "이미 내 스팟에 추가된 항목입니다" 반환(SpotFacadeService)
    // 1. 만약 없다면 Spot 테이블에 spotPostRequestDTO.spotId가 있는지 확인(SpotFacadeService & SpotService)
    // 1-1. 만약 없다면 Spot 테이블에 spotPostRequestDTO를 토대로 데이터 추가(SpotService)
    // 2. Spot 테이블에 spotId가 있다면 SpotUserMap 테이블에 spotPostRequestDTO의 spotId와 userIdx추가(SpotUserMap)
    // 3. "내 스팟에 추가되었습니다" 반환(SpotFacadeService)
    Long userIdx = spotPostRequestDTO.getUserIdx();
    Long spotId = spotPostRequestDTO.getSpotId();
    if(spotUserMapService.existsSpotIdsByUserIdx(userIdx, spotId)){
      return "이미 내 스팟에 추가된 항목입니다";
    }
    if(!spotService.existsBySpotId(spotId)){
      spotService.saveSpot(spotPostRequestDTO);
    }
    return "내 스팟에 추가되었습니다";
  }
}
