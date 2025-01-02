package com.spot.fun.usr.board.controller;

import com.spot.fun.usr.board.entity.CommentEntity;
import com.spot.fun.usr.board.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

  private final CommentService commentService;

  // 댓글 및 대댓글 추가
  @PostMapping("/{boardId}")
  public ResponseEntity<CommentEntity> addComment(
          @PathVariable("boardId") Long boardId,
          @RequestBody Map<String, Object> payload,
          @RequestHeader("Authorization") String authHeader // 인증 헤더 확인
  ) {
    String content = (String) payload.get("content");
    String author = (String) payload.get("author");
    Long parentId = payload.containsKey("parentCommentId")
            ? Long.valueOf(payload.get("parentCommentId").toString())
            : null;

    // 댓글 및 대댓글 추가 처리
    CommentEntity comment = commentService.addComment(boardId, content, author, parentId);
    return ResponseEntity.ok(comment);
  }

  // 댓글 및 대댓글 조회
  @GetMapping("/{boardId}")
  public ResponseEntity<List<CommentEntity>> getComments(@PathVariable("boardId") Long boardId) {
    List<CommentEntity> comments = commentService.getCommentsByBoardId(boardId);
    return ResponseEntity.ok(comments);
  }

  // 댓글 삭제
  @DeleteMapping("/{commentId}")
  public ResponseEntity<Void> deleteComment(@PathVariable("commentId") Long commentId) {
    commentService.deleteComment(commentId);
    return ResponseEntity.noContent().build();
  }

  // 기타 예외 처리
  @RestControllerAdvice
  public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
      return ResponseEntity.badRequest().body(ex.getMessage());
    }
  }
}
