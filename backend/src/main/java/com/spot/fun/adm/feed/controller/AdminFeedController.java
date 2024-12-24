package com.spot.fun.adm.feed.controller;

import com.spot.fun.adm.feed.dto.AdminFeedRequestDTO;
import com.spot.fun.adm.feed.dto.AdminFeedResponseDTO;
import com.spot.fun.adm.feed.service.AdminFeedService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

  @PutMapping("/{idx}")
  public ResponseEntity<?> putUpdate(AdminFeedRequestDTO adminFeedRequestDTO) {
    AdminFeedResponseDTO update = adminFeedService.putUpdate(adminFeedRequestDTO);
    return ResponseEntity.status(HttpStatus.OK).body(update);
  }

  @DeleteMapping("/{idx}")
  public ResponseEntity<?> delete(AdminFeedRequestDTO adminFeedRequestDTO) {
    AdminFeedResponseDTO delete = adminFeedService.delete(adminFeedRequestDTO);
    return ResponseEntity.status(HttpStatus.OK).body(delete);
  }
}
