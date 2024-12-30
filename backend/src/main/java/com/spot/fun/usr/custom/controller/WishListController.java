package com.spot.fun.usr.custom.controller;

import com.spot.fun.usr.custom.dto.CustomDTO;
import com.spot.fun.usr.custom.dto.WishListDTO;
import com.spot.fun.usr.custom.service.WishListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usr/feed/wishlist")
@RequiredArgsConstructor
public class WishListController {

   private final WishListService wishListService;


   @PostMapping("/add")
   public ResponseEntity<String> addWishList(@RequestParam Long userIdx, @RequestParam Long customCno) {
      wishListService.addWishList(userIdx, customCno);
      return ResponseEntity.ok("찜 추가 완료");
   }

   @DeleteMapping("/remove")
   public ResponseEntity<String> removeWishList(@RequestParam Long userIdx, @RequestParam Long customCno) {
      wishListService.removeWishList(userIdx, customCno);
      return ResponseEntity.ok("찜 취소 완료");
   }

   @GetMapping("/{userIdx}")
   public ResponseEntity<?> getWishListByUser(@PathVariable Long userIdx, WishListDTO wishListDTO) {
      wishListDTO.setUserIdx(userIdx);
      return ResponseEntity.ok(wishListService.getFavoritesByUser(wishListDTO));
   }

   @GetMapping("/list/popular")
   public List<CustomDTO> listPopular(@RequestParam(defaultValue = "10") int count) {
      return wishListService.listPopular(count);
   }

   @GetMapping("/list/popular/all")
   public ResponseEntity<List<CustomDTO>> getAllPopularCustoms(@RequestParam(required = false) Long userIdx) {
      List<CustomDTO> popularCustoms = wishListService.listPopularAll(userIdx);
      return ResponseEntity.ok(popularCustoms);
   }

}
