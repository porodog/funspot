package com.spot.fun.usr.board.repository;

import com.spot.fun.usr.board.entity.BoardViewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardViewRepository extends JpaRepository<BoardViewEntity, Long> {
  boolean existsByBoardIdxAndUserIdx(Long boardIdx, Long userIdx);
}

