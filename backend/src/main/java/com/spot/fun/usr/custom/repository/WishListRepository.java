package com.spot.fun.usr.custom.repository;

import com.spot.fun.usr.custom.domain.Custom;
import com.spot.fun.usr.custom.domain.WishList;
import com.spot.fun.usr.custom.dto.WishListDTO;
import com.spot.fun.usr.mypage.dto.CommentRequestDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WishListRepository extends JpaRepository<WishList, Long> {
   @Query("SELECT w " +
           "FROM WishList w " +
           "JOIN FETCH w.custom " +
           "WHERE w.user.id = :#{#wish.userIdx} " +
           "AND (:#{#wish.lastId} = 0 OR w.id < :#{#wish.lastId}) " +
           "ORDER BY w.id DESC")
   List<WishList> findWishListByMypageOrderByIdDesc(@Param("wish")WishListDTO wishListDTO, Pageable pageable);
   void deleteByUserIdxAndCustomCno(Long userIdx, Long customCno);
   boolean existsByUserIdxAndCustomCno(Long userIdx, Long customCno);
   @Query("SELECT w.custom.cno FROM WishList w GROUP BY w.custom.cno ORDER BY COUNT(w.custom.cno) DESC")
   List<Long> findTopCustomIds(Pageable pageable);
   @Query("SELECT w.custom FROM WishList w WHERE w.custom.delYn = 'N' GROUP BY w.custom ORDER BY COUNT(w.custom.cno) DESC")
   List<Custom> findAllCustoms(Long userIdx);

}
