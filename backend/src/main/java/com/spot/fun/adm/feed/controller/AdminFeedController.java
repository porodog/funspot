package com.spot.fun.adm.feed.controller;

import com.spot.fun.adm.feed.dto.AdminFeedRequestDTO;
import com.spot.fun.adm.feed.dto.AdminFeedResponseDTO;
import com.spot.fun.adm.feed.service.AdminFeedService;
import com.spot.fun.usr.feed.dto.FeedResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/adm/feed")
public class AdminFeedController {

  private final AdminFeedService adminFeedService;

  @GetMapping("/list")
  public ResponseEntity<?> getList(AdminFeedRequestDTO adminFeedRequestDTO) {
    AdminFeedResponseDTO list = adminFeedService.getList(adminFeedRequestDTO);
    return ResponseEntity.status(HttpStatus.OK).body(list);
  }

  @GetMapping("/{idx}")
  public ResponseEntity<?> getDetail(AdminFeedRequestDTO adminFeedRequestDTO) {
    AdminFeedResponseDTO detail = adminFeedService.getDetail(adminFeedRequestDTO);
    return ResponseEntity.status(HttpStatus.OK).body(detail);
  }
}
