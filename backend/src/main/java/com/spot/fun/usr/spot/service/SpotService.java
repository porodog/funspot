package com.spot.fun.usr.spot.service;

import com.spot.fun.usr.spot.dto.SpotItemResponseDTO;
import com.spot.fun.usr.spot.dto.SpotListResponseDTO;
import com.spot.fun.usr.spot.dto.SpotPostRequestDTO;
import com.spot.fun.usr.spot.entity.Spot;
import com.spot.fun.usr.spot.repository.SpotRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SpotService {
  private static final Logger log = LoggerFactory.getLogger(SpotService.class);
  private final SpotRepository spotRepository;

  public Spot getSpot(Long spotId){
    return spotRepository.findAllBySpotId(spotId);
  }

  public SpotListResponseDTO setSpotListResponseDTO(Spot spot){
    return SpotListResponseDTO.builder()
            .spotId(spot.getSpotId())
            .addr(spot.getAddr1()+" "+spot.getAddr2())
            .category(String.format("%s > %s > %s",
                    spot.getCat1Name(),
                    spot.getCat2Name(),
                    spot.getCat3Name()))
            .contentType(spot.getContentTypeIdName())
            .firstImage(spot.getFirstImage())
            .firstImage2(spot.getFirstImage2())
            .tel(spot.getTel())
            .title(spot.getTitle())
            .build();
  }

  public SpotItemResponseDTO setSpotItemResponseDTO(Spot spot){
    return SpotItemResponseDTO.builder()
            .spotId(spot.getSpotId())
            .contentId(spot.getContentId())
            .addr1(spot.getAddr1())
            .addr2(spot.getAddr2())
            .area(spot.getAreaCodeName())
            .cat1(spot.getCat1Name())
            .cat2(spot.getCat2Name())
            .cat3(spot.getCat3Name())
            .contentType(spot.getContentTypeIdName())
            .firstImage(spot.getFirstImage())
            .firstImage2(spot.getFirstImage2())
            .mapX(spot.getMapX())
            .mapY(spot.getMapY())
            .mLevel(spot.getMlevel())
            .sigungu(spot.getSigunguCodeName())
            .tel(spot.getTel())
            .title(spot.getTitle())
            .build();
  }

//  public SpotListResponseDTO setSpotListResponseDTO(Spot spot){
//    return SpotListResponseDTO.builder()
//            .spotId(spot.getSpotId())
//            .addr(spot.getAddr1()+" "+spot.getAddr2())
//            .category(spot.getCat1()+" "+spot.getCat2()+" "+spot.getCat3())
//            .contentType(spot.getContentTypeId()+"")
//            .firstImage(spot.getFirstImage())
//            .firstImage2(spot.getFirstImage2())
//            .tel(spot.getTel())
//            .title(spot.getTitle())
//            .build();
//  }
//
//  public SpotItemResponseDTO setSpotItemResponseDTO(Spot spot){
//    return SpotItemResponseDTO.builder()
//            .spotId(spot.getSpotId())
//            .contentId(spot.getContentId())
//            .addr1(spot.getAddr1())
//            .addr2(spot.getAddr2())
//            .area(spot.getAreaCode())
//            .cat1(spot.getCat1())
//            .cat2(spot.getCat2())
//            .cat3(spot.getCat3())
//            .contentType(spot.getContentTypeId()+"")
//            .firstImage(spot.getFirstImage())
//            .firstImage2(spot.getFirstImage2())
//            .mapX(spot.getMapX())
//            .mapY(spot.getMapY())
//            .mLevel(spot.getMlevel())
//            .sigungu(spot.getSigunguCode()+"")
//            .tel(spot.getTel())
//            .title(spot.getTitle())
//            .build();
//  }

  public boolean existsBySpotId(Long spotId){
    return spotRepository.existsBySpotId(spotId);
  }

  @Transactional
  public Spot saveSpot(SpotPostRequestDTO dto) {
    try {
      Spot spot = Spot.builder()
              .contentId(dto.getContentId())
              .addr1(dto.getAddr1())
              .addr2(dto.getAddr2())
              .areaCode(dto.getAreaCode())
              .areaCodeName(dto.getAreaCodeName())
              .cat1(dto.getCat1())
              .cat1Name(dto.getCat1Name())
              .cat2(dto.getCat2())
              .cat2Name(dto.getCat2Name())
              .cat3(dto.getCat3())
              .cat3Name(dto.getCat3Name())
              .contentTypeId(dto.getContentTypeId())
              .contentTypeIdName(dto.getContentTypeIdName())
              .createdTime(dto.getCreatedTime())
              .firstImage(dto.getFirstImage())
              .firstImage2(dto.getFirstImage2())
              .cpyrhtDivCd(dto.getCpyrhtDivCd())
              .mapX(dto.getMapX())
              .mapY(dto.getMapY())
              .mlevel(dto.getMlevel())
              .modifiedTime(dto.getModifiedTime())
              .sigunguCode(dto.getSigunguCode())
              .sigunguCodeName(dto.getSigunguCodeName())
              .tel(dto.getTel())
              .title(dto.getTitle())
              .build();

      return spotRepository.save(spot);
    } catch (Exception e) {
      log.error("Spot 저장 중 에러 발생: ", e);
      throw new RuntimeException("Spot 저장 실패", e);
    }
  }

//  @Transactional
//  public void saveSpot(SpotPostRequestDTO spotPostRequestDTO) {
//    spotRepository.save(Spot.builder()
//            .spotId(spotPostRequestDTO.getSpotId())
//            .contentId(spotPostRequestDTO.getContentId())
//            .addr1(spotPostRequestDTO.getAddr1())
//            .addr2(spotPostRequestDTO.getAddr2())
//            .areaCode(spotPostRequestDTO.getAreaCode())
//            .cat1(spotPostRequestDTO.getCat1())
//            .cat2(spotPostRequestDTO.getCat2())
//            .cat3(spotPostRequestDTO.getCat3())
//            .contentTypeId(spotPostRequestDTO.getContentTypeId())
//            .createdTime(spotPostRequestDTO.getCreatedTime())
//            .firstImage(spotPostRequestDTO.getFirstImage())
//            .firstImage2(spotPostRequestDTO.getFirstImage2())
//            .cpyrhtDivCd(spotPostRequestDTO.getCpyrhtDivCd())
//            .mapX(spotPostRequestDTO.getMapX())
//            .mapY(spotPostRequestDTO.getMapY())
//            .mlevel(spotPostRequestDTO.getMlevel())
//            .modifiedTime(spotPostRequestDTO.getModifiedTime())
//            .sigunguCode(spotPostRequestDTO.getSigunguCode())
//            .tel(spotPostRequestDTO.getTel())
//            .title(spotPostRequestDTO.getTitle())
//            .build());
//  }

  public boolean existsByContentId(Long contentId) {
    return spotRepository.existsByContentId(contentId);
  }

  public Spot findByContentId(Long contentId) {
    return spotRepository.findByContentId(contentId)
            .orElseThrow(() -> new EntityNotFoundException("Spot not found with contentId: " + contentId));
  }

}
