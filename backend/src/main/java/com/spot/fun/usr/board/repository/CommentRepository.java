package com.spot.fun.usr.board.repository;

import com.spot.fun.usr.board.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

  // 논리적으로 삭제되지 않은 상위 댓글 조회
  List<CommentEntity> findByBoard_IdxAndParentIsNullAndDelYn(Long boardIdx, String delYn);

  // 특정 댓글의 모든 하위 댓글 조회 (삭제되지 않은 것만)
  List<CommentEntity> findByParentIdAndDelYn(Long parentId, String delYn);

  List<CommentEntity> delYn(String delYn);
}

