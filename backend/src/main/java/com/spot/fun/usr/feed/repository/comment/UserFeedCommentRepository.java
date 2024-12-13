package com.spot.fun.usr.feed.repository.comment;

import com.spot.fun.usr.feed.dto.comment.FeedCommentDTO;
import com.spot.fun.usr.feed.entity.comment.FeedComment;
import com.spot.fun.usr.mypage.dto.CommentRequestDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserFeedCommentRepository extends JpaRepository<FeedComment, Long> {
  List<FeedComment> findByFeedIdxAndDelYnFalseAndParentIdxIsNull(Long feedIdx);

  List<FeedComment> findByFeedIdxAndParentIdxIsNull(Long feedIdx);

  List<FeedComment> findByParentIdxAndDelYnFalse(Long feedIdx);

  List<FeedComment> findByParentIdx(Long feedIdx);

  Long countByFeedIdxAndDelYnFalseAndParentIdxIsNull(Long feedIdx);

  Long countByFeedIdxAndParentIdxIsNull(Long feedIdx);

  Optional<FeedComment> findByIdxAndDelYnFalse(Long idx);

  Optional<FeedComment> findByIdx(Long idx);

  @Query("SELECT new com.spot.fun.usr.feed.dto.comment.FeedCommentDTO(" +
          "tfc.idx, " +
          "tfc.content, " +
          "tfc2.idx, " +
          "tfc2.delYn, " +
          "tf.idx, " +
          "tf.delYn) " +
          "FROM FeedComment tfc " +
          "LEFT JOIN tfc.parent tfc2 " +
          "LEFT JOIN tfc.feed tf " +
          "WHERE tfc.delYn = false " +
          "AND tfc.user.idx = :#{#comment.userIdx} " +
          "AND (:#{#comment.lastId} = 0 OR tfc.idx < :#{#comment.lastId}) " +
          "ORDER BY tfc.idx DESC")
  List<FeedCommentDTO> findCommentsByUserIdxOrderByIdxDesc(@Param("comment") CommentRequestDTO commentRequestDTO, Pageable pageable);
}
