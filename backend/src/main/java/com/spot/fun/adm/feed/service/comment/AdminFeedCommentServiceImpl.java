package com.spot.fun.adm.feed.service.comment;

import com.spot.fun.adm.feed.dto.comment.AdminFeedCommentRequestDTO;
import com.spot.fun.adm.feed.dto.comment.AdminFeedCommentResponseDTO;
import com.spot.fun.usr.feed.entity.comment.FeedComment;
import com.spot.fun.usr.feed.repository.comment.UserFeedCommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class AdminFeedCommentServiceImpl implements AdminFeedCommentService {

  private final UserFeedCommentRepository userFeedCommentRepository;

  @Override
  public AdminFeedCommentResponseDTO delete(AdminFeedCommentRequestDTO adminFeedCommentRequestDTO) {
    FeedComment comment = userFeedCommentRepository.findByIdxAndDelYnFalse(adminFeedCommentRequestDTO.getIdx())
            .orElseThrow(IllegalArgumentException::new);
    comment.changeDelYn(true);
    comment = userFeedCommentRepository.save(comment);

    return AdminFeedCommentResponseDTO.builder().idx(comment.getIdx()).build();
  }
}
