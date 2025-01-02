package com.spot.fun.usr.board.repository;

import com.spot.fun.usr.board.dto.BoardDTO;
import com.spot.fun.usr.board.entity.BoardEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

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

  @Query("SELECT b, COUNT(c.id) " +
          "FROM BoardEntity b " +
          "LEFT JOIN CommentEntity c ON b.idx = c.board.idx AND c.delYn = 'n' " +
          "WHERE b.delYn = 'N' " +
          "GROUP BY b")
  List<Object[]> getBoardListWithCommentCount();

  @Query("SELECT COUNT(c.id) FROM CommentEntity c WHERE c.board.idx = :boardId AND c.delYn = 'N'")
  long getCommentCountByBoardId(@Param("boardId") Long boardId);

  @Query("SELECT b, u.idx FROM BoardEntity b JOIN User u ON b.nickname = u.nickname WHERE b.delYn = 'N'")
  List<Object[]> findAllWithAuthorIdx(Pageable pageable);

  @Query("SELECT COUNT(b) FROM BoardEntity b WHERE b.delYn = :delYn")
  long countByDelYn(@Param("delYn") String delYn);



}
