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

  // 댓글 추가
  @PostMapping("/{boardId}")
  public ResponseEntity<CommentEntity> addComment(
          @PathVariable Long boardId,
          @RequestBody Map<String, Object> payload
  ) {
    String content = (String) payload.get("content");
    String author = (String) payload.get("author"); // 닉네임
    Long parentId = payload.containsKey("parentCommentId")
            ? Long.valueOf(payload.get("parentCommentId").toString())
            : null;

    CommentEntity comment = commentService.addComment(boardId, content, author, parentId);
    return ResponseEntity.ok(comment);
  }

  // 댓글 조회
  @GetMapping("/{boardId}")
  public ResponseEntity<List<CommentEntity>> getComments(@PathVariable Long boardId) {
    List<CommentEntity> comments = commentService.getCommentsByBoardId(boardId);
    return ResponseEntity.ok(comments);
  }

  // 댓글 삭제
  @DeleteMapping("/{commentId}")
  public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
    commentService.deleteComment(commentId);
    return ResponseEntity.noContent().build();
  }
}
