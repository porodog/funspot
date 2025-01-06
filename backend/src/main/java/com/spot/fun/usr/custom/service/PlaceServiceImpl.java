package com.spot.fun.usr.custom.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.spot.fun.usr.spot.entity.Spot;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.spot.fun.usr.custom.domain.Place;
import com.spot.fun.usr.custom.dto.PlaceDTO;
import com.spot.fun.usr.custom.repository.PlaceRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PlaceServiceImpl implements PlaceService {
    private final PlaceRepository placeRepository;
    private final ModelMapper modelMapper;


    @Override
    public List<PlaceDTO> searchPlaces(String address, String name) {
       List<Place> places;

       // 조건에 따라 검색 로직 분기
       if ((address == null || address.isEmpty()) && (name == null || name.isEmpty())) {
          // 아무 입력도 없는 경우 모든 장소 반환
          places = placeRepository.findAll();
       } else if (address != null && !address.isEmpty() && name != null && !name.isEmpty()) {
          // 주소와 이름 모두 고려
          places = placeRepository.findByAddressContainingIgnoreCaseAndNameContainingIgnoreCase(address, name);
       } else if (address != null && !address.isEmpty()) {
          // 주소만 고려
          places = placeRepository.findByAddressContainingIgnoreCase(address);
       } else {
          // 이름만 고려
          places = placeRepository.findByNameContainingIgnoreCase(name);
       }
        return places.stream()
                .map(place -> modelMapper.map(place, PlaceDTO.class))
                .collect(Collectors.toList());
    }

  @Transactional
  public Place saveFromSpot(Spot spot) {
    Place place = Place.builder()
            .name(spot.getTitle())
            .address(spot.getAddr1() + " " + spot.getAddr2())
            .simpleAddress(spot.getAreaCodeName() + " " + spot.getSigunguCodeName())
            .latitude(spot.getMapX())
            .longitude(spot.getMapY())
            .category(spot.getCat2Name())
            .description("")
            .estimatedCost(0)
            .durationMinutes(0)
            .image(spot.getFirstImage())
            .build();

    return placeRepository.save(place);
  }
    
}

