package com.spot.fun.usr.board.repository;

import com.spot.fun.usr.board.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
  long countByBoardIdxAndDelYn(Long boardIdx, String delYn);

  // 논리적으로 삭제되지 않은 상위 댓글 조회 (parent가 null인 댓글)
  List<CommentEntity> findByBoard_IdxAndParentIsNullAndDelYn(Long boardIdx, String delYn);

  // 특정 댓글의 모든 하위 댓글 조회 (삭제되지 않은 것만)
  List<CommentEntity> findByParentIdAndDelYn(Long parentIdx, String delYn);

  // 댓글과 하위 댓글을 함께 조회
  @Query("SELECT c FROM CommentEntity c LEFT JOIN FETCH c.replies r WHERE c.board.idx = :boardId AND c.parent IS NULL AND c.delYn = 'n' AND (r.delYn = 'n' OR r.delYn IS NULL)")
  List<CommentEntity> findParentCommentsWithReplies(@Param("boardId") Long boardId);

  // 논리적으로 삭제 여부를 확인
  List<CommentEntity> findByDelYn(String delYn);

  @Query("SELECT COUNT(c) FROM CommentEntity c WHERE c.board.idx = :boardIdx AND c.delYn = 'N'")
  long countByBoardIdxAndDelYn(@Param("boardIdx") Long boardIdx);
}

