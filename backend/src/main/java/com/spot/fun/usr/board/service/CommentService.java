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
      if (parent.isEmpty()) {
        throw new IllegalArgumentException("부모 댓글이 존재하지 않습니다.");
      }
      comment.setParent(parent.get());
    }

    return commentRepository.save(comment);
  }

  // 댓글 조회
  public List<CommentEntity> getCommentsByBoardId(Long boardId) {
    return commentRepository.findParentCommentsWithReplies(boardId);
  }

  private void setReplies(CommentEntity comment) {
    List<CommentEntity> replies = commentRepository.findByParentIdAndDelYn(comment.getId(), "n");
    comment.setReplies(replies);
    for (CommentEntity reply : replies) {
      setReplies(reply); // 재귀적으로 하위 대댓글 설정
    }
  }

  // 댓글 삭제 (논리 삭제)
  @Transactional
  public void deleteComment(Long commentId) {
    CommentEntity comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new IllegalArgumentException("댓글을 찾을 수 없습니다."));
    comment.setDelYn("y");
    commentRepository.save(comment); // 논리 삭제 처리

    // 하위 대댓글도 논리 삭제
    List<CommentEntity> replies = commentRepository.findByParentIdAndDelYn(commentId, "n");
    if (replies != null && !replies.isEmpty()) {
      replies.forEach(reply -> {
        reply.setDelYn("y");
        commentRepository.save(reply);
      });
    }
  }

}
