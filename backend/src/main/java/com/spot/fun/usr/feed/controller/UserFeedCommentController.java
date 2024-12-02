package com.spot.fun.usr.feed.controller;

import com.spot.fun.usr.feed.dto.comment.FeedCommentDTO;
import com.spot.fun.usr.feed.service.comment.UserFeedCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/usr/feed/comment")
public class UserFeedCommentController {

  private final UserFeedCommentService userFeedCommentService;

  @GetMapping("/{idx}")
  public List<FeedCommentDTO> commentList(@PathVariable("idx") Long idx) {
    return userFeedCommentService.getCommentList(idx);
  }

  @PostMapping("/{idx}")
  public ResponseEntity<?> insert(@PathVariable("idx") Long idx, FeedCommentDTO feedCommentDTO) {
    feedCommentDTO.setFeedIdx(idx);
    FeedCommentDTO result = userFeedCommentService.insert(feedCommentDTO);
    if(ObjectUtils.isEmpty(result)) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(result);
  }
}
