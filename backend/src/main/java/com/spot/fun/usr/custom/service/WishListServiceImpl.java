package com.spot.fun.usr.custom.service;


import com.spot.fun.usr.custom.domain.Custom;
import com.spot.fun.usr.custom.domain.WishList;
import com.spot.fun.usr.custom.repository.WishListRepository;
import com.spot.fun.usr.user.entity.User;
import lombok.RequiredArgsConstructor;
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
   public List<WishList> getFavoritesByUser(Long userIdx) {
      return wishListRepository.findByUserIdx(userIdx);
   }
}
