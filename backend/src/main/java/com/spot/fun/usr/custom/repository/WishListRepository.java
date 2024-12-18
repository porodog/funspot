package com.spot.fun.usr.custom.repository;

import com.spot.fun.usr.custom.domain.WishList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishListRepository extends JpaRepository<WishList, Long> {
   List<WishList> findByUserIdx(Long userIdx);
   void deleteByUserIdxAndCustomCno(Long userIdx, Long customCno);
   boolean existsByUserIdxAndCustomCno(Long userIdx, Long customCno);
}
