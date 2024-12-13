package com.spot.fun.usr.mypage.service.comment;

import com.spot.fun.usr.mypage.dto.CommentRequestDTO;
import com.spot.fun.usr.mypage.dto.CommentResponseDTO;

public interface UserMypageCommentService {
  CommentResponseDTO getFeedCommentList(CommentRequestDTO commentRequestDTO);
  CommentResponseDTO putFeedCommentDelete(CommentRequestDTO commentRequestDTO);
}
