package com.spot.fun.usr.board.service;

import com.spot.fun.usr.board.entity.BoardEntity;
import com.spot.fun.usr.board.entity.CommentEntity;
import com.spot.fun.usr.board.repository.BoardRepository;
import com.spot.fun.usr.board.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

  private final CommentRepository commentRepository;
  private final BoardRepository boardRepository;

  // 댓글 추가
  @Transactional
  public CommentEntity addComment(Long boardId, String content, String author, Long parentId) {
    Optional<BoardEntity> board = boardRepository.findById(boardId);
    if (board.isEmpty()) {
      throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
    }

    CommentEntity comment = new CommentEntity();
    comment.setBoard(board.get());
    comment.setContent(content);
    comment.setAuthor(author);

    if (parentId != null) {
      Optional<CommentEntity> parent = commentRepository.findById(parentId);
      parent.ifPresent(comment::setParent);
    }

    return commentRepository.save(comment);
  }

  // 댓글 조회
  public List<CommentEntity> getCommentsByBoardId(Long boardIdx) {
    return commentRepository.findByBoard_IdxAndParentIsNullAndDelYn(boardIdx, "n");
  }


  // 댓글 삭제 (논리 삭제)
  @Transactional
  public void deleteComment(Long commentId) {
    Optional<CommentEntity> comment = commentRepository.findById(commentId);
    if (comment.isEmpty()) {
      throw new IllegalArgumentException("댓글을 찾을 수 없습니다.");
    }

    CommentEntity existingComment = comment.get();
    existingComment.setDelYn("y"); // 논리적 삭제 처리
    commentRepository.save(existingComment);
  }
}
