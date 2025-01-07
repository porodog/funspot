package com.spot.fun.usr.spot.service;

import com.spot.fun.usr.custom.service.PlaceService;
import com.spot.fun.usr.custom.service.PlaceServiceImpl;
import com.spot.fun.usr.spot.dto.SpotItemResponseDTO;
import com.spot.fun.usr.spot.dto.SpotListResponseDTO;
import com.spot.fun.usr.spot.dto.SpotPostRequestDTO;
import com.spot.fun.usr.spot.entity.Spot;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SpotFacadeService {
  private static final Logger log = LoggerFactory.getLogger(SpotFacadeService.class);
  private final SpotUserMapService spotUserMapService;
  private final SpotService spotService;
  private final PlaceServiceImpl placeService;


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
    try {
      Long userIdx = spotPostRequestDTO.getUserIdx();
//    Long spotId = spotPostRequestDTO.getSpotId();
      Long spotId = spotPostRequestDTO.getContentId();  // contentId를 spotId로 사용

      // 이미 저장된 스팟인지 확인
      if(spotUserMapService.existsSpotIdsByUserIdx(userIdx, spotId)){
        return "이미 내 스팟에 추가된 항목입니다";
      }

      Spot savedSpot = null;

      // Spot 테이블에 데이터가 없으면 저장
      if(!spotService.existsBySpotId(spotId)){
        // Spot이 새로 저장된 경우에만 Place도 저장
//        placeService.saveFromSpot(savedSpot);
//        spotService.saveSpot(spotPostRequestDTO);
        savedSpot = spotService.saveSpot(spotPostRequestDTO);
        // Spot이 새로 저장된 경우에만 Place도 저장
        placeService.saveFromSpot(savedSpot);
      }

      // SpotUserMap에 매핑 정보 저장
      spotUserMapService.saveSpotUserMap(spotId, userIdx);

      return "내 스팟에 추가되었습니다";
    }catch (Exception e) {
      // 로깅 추가
      log.error("스팟 저장 중 에러 발생: ", e);
      throw e;
    }
  }
}
