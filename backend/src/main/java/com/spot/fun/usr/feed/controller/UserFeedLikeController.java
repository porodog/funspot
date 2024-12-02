package com.spot.fun.usr.feed.controller;

import com.spot.fun.usr.feed.service.like.UserFeedLikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/usr/feed/like")
public class UserFeedLikeController {

  private final UserFeedLikeService userFeedLikeService;

  @PostMapping("/{idx}")
  public ResponseEntity<?> insert(@PathVariable("idx") Long idx) {
    boolean result = userFeedLikeService.insert(idx);
    if(!result) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(true);
  }

  @DeleteMapping("/{idx}")
  public ResponseEntity<?> delete(@PathVariable("idx") Long idx) {
    boolean result = userFeedLikeService.delete(idx);
    if(!result) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(true);
  }
}
