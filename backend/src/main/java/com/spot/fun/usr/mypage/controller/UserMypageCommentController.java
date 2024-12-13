package com.spot.fun.usr.mypage.controller;

import com.spot.fun.token.util.AuthTokenUtil;
import com.spot.fun.usr.feed.dto.FeedResponseDTO;
import com.spot.fun.usr.mypage.dto.CommentRequestDTO;
import com.spot.fun.usr.mypage.dto.CommentResponseDTO;
import com.spot.fun.usr.mypage.service.comment.UserMypageCommentService;
import com.spot.fun.usr.user.dto.UserDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/usr/mypage/comment")
public class UserMypageCommentController {

  private final UserMypageCommentService userMypageCommentService;
  private final AuthTokenUtil authTokenUtil;

  @GetMapping("/feed")
  public ResponseEntity<?> getFeedCommentList(HttpServletRequest request,
                                              HttpServletResponse response,
                                              CommentRequestDTO commentRequestDTO) {
    Long userIdx = getLoginUserIdx(request, response);
    if (Objects.isNull(userIdx)) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
    commentRequestDTO.setUserIdx(userIdx);
    CommentResponseDTO list = userMypageCommentService.getFeedCommentList(commentRequestDTO);
    return ResponseEntity.status(HttpStatus.OK).body(list);
  }

  @PutMapping("/feed")
  public ResponseEntity<?> putFeedCommentDelete(HttpServletRequest request,
                                              HttpServletResponse response,
                                              CommentRequestDTO commentRequestDTO) {
    Long userIdx = getLoginUserIdx(request, response);
    if (Objects.isNull(userIdx)) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
    CommentResponseDTO comment = userMypageCommentService.putFeedCommentDelete(commentRequestDTO);
    return ResponseEntity.status(HttpStatus.OK).body(comment);
  }


  private Long getLoginUserIdx(HttpServletRequest request, HttpServletResponse response) {
    UserDTO loginUserDTO = authTokenUtil.validateTokenAndGetUserDTO(request, response);
    return loginUserDTO.getIdx();
  }
}
