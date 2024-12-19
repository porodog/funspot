package com.spot.fun.usr.board.repository;

import com.spot.fun.usr.board.entity.BoardEntity;
import com.spot.fun.usr.board.entity.BoardLikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLikeEntity, Long> {
  boolean existsByBoardIdxAndUserIdx(Long boardIdx, Long userIdx);
}


