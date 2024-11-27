package com.spot.fun.usr.feed.controller;

import com.spot.fun.usr.feed.dto.FeedDTO;
import com.spot.fun.usr.feed.service.UserFeedService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/usr/feed")
public class UserFeedController {
  private final UserFeedService userFeedService;

  @GetMapping("/list")
  public List<FeedDTO> list(FeedDTO feedDTO) {
    List<FeedDTO> list = userFeedService.getList();
    return list;
  }
}
