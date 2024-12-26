package com.spot.fun.usr.board.repository;

import com.spot.fun.usr.board.dto.BoardDTO;
import com.spot.fun.usr.board.entity.BoardEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Long> {

  @Query("SELECT b FROM BoardEntity b WHERE b.delYn = :delYn ORDER BY b.regDate DESC")
  Page<BoardEntity> findByDelYn(String delYn, Pageable pageable);

  @Query("SELECT b FROM BoardEntity b WHERE b.delYn = 'N' AND (b.title LIKE %:keyword% OR b.content LIKE %:keyword%) ORDER BY b.regDate DESC")
  Page<BoardEntity> searchByTitleOrContent(String keyword, Pageable pageable);

  @Query("SELECT b FROM BoardEntity b WHERE b.delYn = 'N' AND b.title LIKE %:keyword% ORDER BY b.regDate DESC")
  Page<BoardEntity> searchByTitle(String keyword, Pageable pageable);

  @Query("SELECT b FROM BoardEntity b WHERE b.delYn = 'N' AND b.content LIKE %:keyword% ORDER BY b.regDate DESC")
  Page<BoardEntity> searchByContent(String keyword, Pageable pageable);

  @Query("SELECT b FROM BoardEntity b WHERE b.delYn = 'N' AND b.nickname LIKE %:keyword% ORDER BY b.regDate DESC")
  Page<BoardEntity> searchByNickname(String keyword, Pageable pageable);
}
