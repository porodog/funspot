package com.spot.fun.usr.custom.service;


import com.spot.fun.usr.custom.domain.Custom;
import com.spot.fun.usr.custom.domain.WishList;
import com.spot.fun.usr.custom.dto.CustomDTO;
import com.spot.fun.usr.custom.dto.PlaceDTO;
import com.spot.fun.usr.custom.dto.WishListDTO;
import com.spot.fun.usr.custom.repository.CustomRepository;
import com.spot.fun.usr.custom.repository.WishListRepository;
import com.spot.fun.usr.mypage.dto.CommentResponseDTO;
import com.spot.fun.usr.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.spot.fun.usr.custom.domain.CustomPlace;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishListServiceImpl implements WishListService {

   private final WishListRepository wishListRepository;
   private final CustomRepository customRepository;
   private final ModelMapper modelMapper;

   @Override
   @Transactional
   public void addWishList(Long userIdx, Long customCno) {
      if (wishListRepository.existsByUserIdxAndCustomCno(userIdx, customCno)) {
         throw new IllegalArgumentException("이미 찜한 코스입니다.");
      }

      WishList wishList = WishList.builder()
              .user(User.builder().idx(userIdx).build())
              .custom(Custom.builder().cno(customCno).build())
              .build();
      wishListRepository.save(wishList);
   }

   @Override
   @Transactional
   public void removeWishList(Long userIdx, Long customCno) {
      wishListRepository.deleteByUserIdxAndCustomCno(userIdx, customCno);
   }

   @Override
   @Transactional(readOnly = true)
   public WishListDTO getFavoritesByUser(WishListDTO wishListDTO) {
      int pageSize = wishListDTO.getPageSize();
      Pageable pageable = PageRequest.of(0, pageSize, Sort.by("id").descending());
      List<WishListDTO> list = wishListRepository.findWishListByMypageOrderByIdDesc(wishListDTO, pageable).stream()
              .map(WishList::toDTO).toList();
      boolean hasNext = ((list.size() == pageSize) && !ObjectUtils.isEmpty(list));
      return WishListDTO.builder()
              .wishList(list)
              .hasNext(hasNext)
              .build();
   }

   @Override
   public List<CustomDTO> listPopular(int topCount) {
      Pageable pageable = PageRequest.of(0, topCount);
      List<Long> popularCustomIds = wishListRepository.findTopCustomIds(pageable);

      // Custom과 연결된 Place 정보 가져오기
      List<Custom> customs = customRepository.findCustomsWithPlacesByIds(popularCustomIds);

      // DTO 변환 및 정렬 (customId 순서대로)
      return customs.stream()
              .sorted(Comparator.comparing(custom -> popularCustomIds.indexOf(custom.getCno())))
              .map(custom -> {
                 CustomDTO customDTO = modelMapper.map(custom, CustomDTO.class);

                 List<PlaceDTO> placeDTOs = custom.getCustomPlaces().stream()
                         .sorted(Comparator.comparing(CustomPlace::getOrderIndex))
                         .map(cp -> modelMapper.map(cp.getPlace(), PlaceDTO.class))
                         .collect(Collectors.toList());

                 customDTO.setPlaces(placeDTOs);
                 customDTO.setTags(custom.getTagList());
                 return customDTO;
              })
              .collect(Collectors.toList());
   }

   public List<CustomDTO> listPopularAll(Long userIdx) {
      List<Custom> customs = wishListRepository.findAllCustoms(userIdx);

      return customs.stream().map(custom -> {
         CustomDTO customDTO = modelMapper.map(custom, CustomDTO.class);

         List<PlaceDTO> placeDTOs = custom.getCustomPlaces().stream()
                 .sorted(Comparator.comparing(CustomPlace::getOrderIndex))
                 .map(cp -> modelMapper.map(cp.getPlace(), PlaceDTO.class))
                 .collect(Collectors.toList());

         boolean isWishList = wishListRepository.existsByUserIdxAndCustomCno(userIdx, custom.getCno());

         customDTO.setPlaces(placeDTOs);
         customDTO.setTags(custom.getTagList());
         customDTO.setWishList(isWishList);
         return customDTO;
      }).collect(Collectors.toList());
   }
}
