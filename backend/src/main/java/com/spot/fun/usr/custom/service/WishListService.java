package com.spot.fun.usr.custom.service;

import com.spot.fun.usr.custom.domain.WishList;
import com.spot.fun.usr.custom.dto.CustomDTO;
import com.spot.fun.usr.custom.dto.WishListDTO;

import java.util.List;

public interface WishListService {
   void addWishList(Long userIdx, Long customCno); // 찜 추가
   void removeWishList(Long userIdx, Long customCno); // 찜 취소
   WishListDTO getFavoritesByUser(WishListDTO wishListDTO); // 사용자 찜 목록 조회
   List<CustomDTO> listPopular(int topCount);
   List<CustomDTO> listPopularAll(Long userIdx);

}
