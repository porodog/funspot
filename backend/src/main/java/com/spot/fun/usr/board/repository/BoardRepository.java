package com.spot.fun.usr.board.repository;

import com.spot.fun.usr.board.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Long> {

  // 논리 삭제된 게시글 제외 조회
  @Query("SELECT b FROM BoardEntity b WHERE b.delYn = :delYn ORDER BY b.regDate DESC")
  List<BoardEntity> findByDelYnOrderByRegDateDesc(String delYn);

}
