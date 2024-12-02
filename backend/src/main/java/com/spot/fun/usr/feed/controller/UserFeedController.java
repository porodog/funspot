package com.spot.fun.usr.feed.controller;

import com.spot.fun.file.FileUploadUtil;
import com.spot.fun.token.util.AuthTokenUtil;
import com.spot.fun.usr.feed.dto.FeedDTO;
import com.spot.fun.usr.feed.dto.FeedRequestDTO;
import com.spot.fun.usr.feed.dto.FeedResponseDTO;
import com.spot.fun.usr.feed.service.UserFeedService;
import com.spot.fun.usr.user.dto.UserDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/usr/feed")
public class UserFeedController {
  private final UserFeedService userFeedService;
  private final FileUploadUtil fileUploadUtil;
  private final AuthTokenUtil authTokenUtil;

  @GetMapping("")
  public FeedResponseDTO list(HttpServletRequest request, HttpServletResponse response, FeedRequestDTO feedRequestDTO) {
    UserDTO loginUserDTO = authTokenUtil.validateTokenAndGetUserDTO(request, response);
    if(!Objects.isNull(loginUserDTO.getIdx())) {
      feedRequestDTO.setLoginUserDTO(loginUserDTO);
    }

    return userFeedService.getList(feedRequestDTO);
  }

  @GetMapping("/{idx}")
  public FeedDTO detail(@PathVariable("idx") Long idx) {
    return userFeedService.getDetail(idx);
  }

  @PostMapping("")
  public ResponseEntity<?> insert(FeedDTO feedDTO) {
    Long idx = userFeedService.postInsert(feedDTO);
    if(Objects.isNull(idx)) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(idx);
  }

  @GetMapping("/image/{fileName}")
  public ResponseEntity<Resource> getImage(@PathVariable("fileName") String fileName) {
    String menuType = "feed";
    return fileUploadUtil.outputImage(menuType, fileName);
  }


}
