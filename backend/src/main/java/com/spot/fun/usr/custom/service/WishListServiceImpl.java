package com.spot.fun.usr.custom.service;


import com.spot.fun.usr.custom.domain.Custom;
import com.spot.fun.usr.custom.domain.WishList;
import com.spot.fun.usr.custom.dto.WishListDTO;
import com.spot.fun.usr.custom.repository.WishListRepository;
import com.spot.fun.usr.mypage.dto.CommentResponseDTO;
import com.spot.fun.usr.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishListServiceImpl implements WishListService {

   private final WishListRepository wishListRepository;

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
}
