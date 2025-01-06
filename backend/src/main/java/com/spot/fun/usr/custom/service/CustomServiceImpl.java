package com.spot.fun.usr.custom.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import com.spot.fun.paging.ScrollPagingUtil;
import com.spot.fun.usr.custom.dto.CustomResponseDTO;
import com.spot.fun.usr.custom.repository.WishListRepository;
import org.apache.commons.lang3.ObjectUtils;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spot.fun.usr.custom.domain.Custom;
import com.spot.fun.usr.custom.domain.CustomPlace;
import com.spot.fun.usr.custom.domain.Place;
import com.spot.fun.usr.custom.dto.CustomDTO;
import com.spot.fun.usr.custom.dto.PlaceDTO;
import com.spot.fun.usr.custom.repository.CustomRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class CustomServiceImpl implements CustomService {
   private final ModelMapper modelMapper;
   private final CustomRepository customRepository;
   private final WishListRepository wishListRepository;

   @PersistenceContext
   private EntityManager entityManager;

   @Override
   public Long register(CustomDTO customDTO) {
      if (customDTO.getDelYn() == null) {
         customDTO.setDelYn("N");
      }
      Custom custom = Custom.builder()
              .title(customDTO.getTitle())
              .description(customDTO.getDescription())
              .idx(customDTO.getIdx())
              .nickname(customDTO.getNickname())
              .tags(String.join(",", customDTO.getTags()))
              .delYn(customDTO.getDelYn())
              .build();

      List<CustomPlace> customPlaces = IntStream.range(0, customDTO.getPlaces().size())
              .mapToObj(index -> {
                 PlaceDTO dto = customDTO.getPlaces().get(index);
                 Place place = entityManager.find(Place.class, dto.getId());
                 if (place == null) {
                    throw new RuntimeException("Place not found with id: " + dto.getId());
                 }
                 CustomPlace customPlace = new CustomPlace();
                 customPlace.setCustom(custom);
                 customPlace.setPlace(place);
                 customPlace.setOrderIndex(index); // 🔥 순서 보장
                 return customPlace;
              })
              .collect(Collectors.toList());


      custom.setCustomPlaces(customPlaces);

      Custom saved = customRepository.save(custom);
      return saved.getCno();
   }



   @Override
   public CustomDTO get(Long cno, Long userIdx) {
      Custom custom = customRepository.findById(cno)
              .orElseThrow(() -> new RuntimeException("Custom not found for cno: " + cno));

      CustomDTO customDTO = modelMapper.map(custom, CustomDTO.class);

      // 🔥 CustomPlace의 Place를 DTO로 변환 (orderIndex 순으로 정렬)
      List<PlaceDTO> placeDTOs = custom.getCustomPlaces().stream()
              .sorted(Comparator.comparing(CustomPlace::getOrderIndex)) // 🟢 orderIndex로 정렬
              .map(customPlace -> modelMapper.map(customPlace.getPlace(), PlaceDTO.class)) // 🔥 CustomPlace의 Place만 매핑
              .collect(Collectors.toList());

      boolean isWishList = wishListRepository.existsByUserIdxAndCustomCno(userIdx, cno);

      customDTO.setPlaces(placeDTOs);
      customDTO.setTags(custom.getTagList()); // 🔥 태그 매핑 추가
      customDTO.setWishList(isWishList);

      return customDTO;
   }

   @Override
   public CustomResponseDTO list(Long userIdx, Pageable pageable, ScrollPagingUtil scrollPagingUtil) {
      List<Custom> customList = customRepository.findAllScrollPaging(scrollPagingUtil, pageable);

      List<CustomDTO> dtoList = customList.stream().map(custom -> {
         // 1️⃣ CustomDTO 생성
         CustomDTO customDTO = modelMapper.map(custom, CustomDTO.class);

         // 2️⃣ CustomPlace를 orderIndex 기준으로 정렬 후 PlaceDTO로 변환
         List<PlaceDTO> placeDTOs = custom.getCustomPlaces().stream()
                 .sorted(Comparator.comparing(CustomPlace::getOrderIndex)) // 🟢 orderIndex로 정렬
                 .map(customPlace -> modelMapper.map(customPlace.getPlace(), PlaceDTO.class)) // 🔥 CustomPlace의 Place만 매핑
                 .collect(Collectors.toList());

         boolean isWishList = wishListRepository.existsByUserIdxAndCustomCno(userIdx, custom.getCno());

         // 3️⃣ CustomDTO에 places 설정
         customDTO.setPlaces(placeDTOs);
         customDTO.setTags(custom.getTagList());
         customDTO.setWishList(isWishList);
         return customDTO;
      }).collect(Collectors.toList());

      boolean hasNext = ((dtoList.size() == scrollPagingUtil.getPageSize()) && !ObjectUtils.isEmpty(dtoList));

      return CustomResponseDTO.builder()
              .list(dtoList)
              .hasNext(hasNext)
              .build();
   }

   @Override
   public void update(Long cno, CustomDTO customDTO) {
      Custom existingCustom = customRepository.findById(cno)
              .orElseThrow(() -> new RuntimeException("Custom not found for cno: " + cno));

      // 1️⃣ 코스 기본 정보 업데이트 (제목, 설명, 태그)
      existingCustom.setTitle(customDTO.getTitle());
      existingCustom.setDescription(customDTO.getDescription());
      existingCustom.setNickname(customDTO.getNickname());
      existingCustom.setTags(String.join(",", customDTO.getTags())); // 태그 업데이트

      // 2️⃣ 장소 정보 업데이트
      existingCustom.getCustomPlaces().clear(); // 기존 장소 제거

      List<CustomPlace> newCustomPlaces = IntStream.range(0, customDTO.getPlaces().size())
              .mapToObj(index -> {
                 PlaceDTO placeDTO = customDTO.getPlaces().get(index);
                 Place place = modelMapper.map(placeDTO, Place.class);
                 CustomPlace customPlace = CustomPlace.builder()
                         .custom(existingCustom)
                         .place(place)
                         .orderIndex(index) // 🔥 인덱스 설정
                         .build();
                 return customPlace;
              })
              .collect(Collectors.toList());

      existingCustom.getCustomPlaces().addAll(newCustomPlaces);

      customRepository.save(existingCustom);
   }

   @Override
   public void delete(Long cno) {
      Custom custom = customRepository.findById(cno)
              .orElseThrow(() -> new RuntimeException("존재하지 않는 코스입니다."));
      custom.markAsDeleted();
      customRepository.save(custom);
   }

   @Override
   public List<CustomDTO> listRecent(Long userIdx) {
      List<Custom> customList = customRepository.findTop10ByDelYnOrderByCnoDesc("N");

      return customList.stream().map(custom -> {
         // 1️⃣ CustomDTO 생성
         CustomDTO customDTO = modelMapper.map(custom, CustomDTO.class);

         // 2️⃣ CustomPlace를 orderIndex 기준으로 정렬 후 PlaceDTO로 변환
         List<PlaceDTO> placeDTOs = custom.getCustomPlaces().stream()
                 .sorted(Comparator.comparing(CustomPlace::getOrderIndex)) // 🟢 orderIndex로 정렬
                 .map(customPlace -> modelMapper.map(customPlace.getPlace(), PlaceDTO.class)) // 🔥 CustomPlace의 Place만 매핑
                 .collect(Collectors.toList());

         boolean isWishList = wishListRepository.existsByUserIdxAndCustomCno(userIdx, custom.getCno());

         // 3️⃣ CustomDTO에 places 설정
         customDTO.setPlaces(placeDTOs);
         customDTO.setTags(custom.getTagList());
         customDTO.setWishList(isWishList);
         return customDTO;
      }).collect(Collectors.toList());
   }


}
