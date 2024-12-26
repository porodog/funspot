package com.spot.fun.usr.spot.service;

import com.spot.fun.usr.spot.dto.SpotItemResponseDTO;
import com.spot.fun.usr.spot.dto.SpotListResponseDTO;
import com.spot.fun.usr.spot.dto.SpotPostRequestDTO;
import com.spot.fun.usr.spot.entity.Spot;
import com.spot.fun.usr.spot.repository.SpotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SpotService {
  private final SpotRepository spotRepository;

  public Spot getSpot(Long spotId){
    return spotRepository.findAllBySpotId(spotId);
  }

  public SpotListResponseDTO setSpotListResponseDTO(Spot spot){
    return SpotListResponseDTO.builder()
            .spotId(spot.getSpotId())
            .addr(spot.getAddr1()+" "+spot.getAddr2())
            .category(spot.getCat1()+" "+spot.getCat2()+" "+spot.getCat3())
            .contentType(spot.getContentTypeId()+"")
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
            .area(spot.getAreaCode())
            .cat1(spot.getCat1())
            .cat2(spot.getCat2())
            .cat3(spot.getCat3())
            .contentType(spot.getContentTypeId()+"")
            .firstImage(spot.getFirstImage())
            .firstImage2(spot.getFirstImage2())
            .mapX(spot.getMapX())
            .mapY(spot.getMapY())
            .mLevel(spot.getMlevel())
            .sigungu(spot.getSigunguCode()+"")
            .tel(spot.getTel())
            .title(spot.getTitle())
            .build();
  }

  public boolean existsBySpotId(Long spotId){
    return spotRepository.existsBySpotId(spotId);
  }

  public void saveSpot(SpotPostRequestDTO spotPostRequestDTO) {
    spotRepository.save(Spot.builder()
            .spotId(spotPostRequestDTO.getSpotId())
            .contentId(spotPostRequestDTO.getContentId())
            .addr1(spotPostRequestDTO.getAddr1())
            .addr2(spotPostRequestDTO.getAddr2())
            .areaCode(spotPostRequestDTO.getAreaCode())
            .cat1(spotPostRequestDTO.getCat1())
            .cat2(spotPostRequestDTO.getCat2())
            .cat3(spotPostRequestDTO.getCat3())
            .contentTypeId(spotPostRequestDTO.getContentTypeId())
            .createdTime(spotPostRequestDTO.getCreatedTime())
            .firstImage(spotPostRequestDTO.getFirstImage())
            .firstImage2(spotPostRequestDTO.getFirstImage2())
            .cpyrhtDivCd(spotPostRequestDTO.getCpyrhtDivCd())
            .mapX(spotPostRequestDTO.getMapX())
            .mapY(spotPostRequestDTO.getMapY())
            .mlevel(spotPostRequestDTO.getMlevel())
            .modifiedTime(spotPostRequestDTO.getModifiedTime())
            .sigunguCode(spotPostRequestDTO.getSigunguCode())
            .tel(spotPostRequestDTO.getTel())
            .title(spotPostRequestDTO.getTitle())
            .build());
  }

}
