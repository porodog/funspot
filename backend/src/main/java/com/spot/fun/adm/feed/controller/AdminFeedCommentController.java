package com.spot.fun.adm.feed.controller;

import com.spot.fun.adm.feed.dto.comment.AdminFeedCommentRequestDTO;
import com.spot.fun.adm.feed.dto.comment.AdminFeedCommentResponseDTO;
import com.spot.fun.adm.feed.service.comment.AdminFeedCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/adm/feed/comment")
public class AdminFeedCommentController {

  private final AdminFeedCommentService adminFeedCommentService;

  @DeleteMapping("/{idx}")
  public ResponseEntity<?> delete(AdminFeedCommentRequestDTO adminFeedCommentRequestDTO) {
    AdminFeedCommentResponseDTO delete = adminFeedCommentService.delete(adminFeedCommentRequestDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(delete);
  }
}
