package com.spot.fun.usr.custom.service;

import com.spot.fun.usr.custom.domain.WishList;

import java.util.List;

public interface WishListService {
   void addWishList(Long userIdx, Long customCno); // 찜 추가
   void removeWishList(Long userIdx, Long customCno); // 찜 취소
   List<WishList> getFavoritesByUser(Long userIdx); // 사용자 찜 목록 조회

}
