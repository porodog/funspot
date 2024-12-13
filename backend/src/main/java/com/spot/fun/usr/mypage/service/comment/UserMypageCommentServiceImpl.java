package com.spot.fun.usr.mypage.service.comment;

import com.spot.fun.usr.feed.dto.comment.FeedCommentDTO;
import com.spot.fun.usr.feed.entity.comment.FeedComment;
import com.spot.fun.usr.feed.repository.comment.UserFeedCommentRepository;
import com.spot.fun.usr.mypage.dto.CommentRequestDTO;
import com.spot.fun.usr.mypage.dto.CommentResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserMypageCommentServiceImpl implements UserMypageCommentService {

  private final UserFeedCommentRepository userFeedCommentRepository;

  @Override
  public CommentResponseDTO getFeedCommentList(CommentRequestDTO commentRequestDTO) {
    int pageSize = commentRequestDTO.getPageSize();
    Pageable pageable = PageRequest.of(0, pageSize, Sort.by("idx").descending());
    List<FeedCommentDTO> list = userFeedCommentRepository.findCommentsByUserIdxOrderByIdxDesc(commentRequestDTO, pageable);
    boolean hasNext = ((list.size() == pageSize) && !ObjectUtils.isEmpty(list));
    return CommentResponseDTO.builder()
            .feedCommentList(list)
            .hasNext(hasNext)
            .build();
  }

  @Transactional
  @Override
  public CommentResponseDTO putFeedCommentDelete(CommentRequestDTO commentRequestDTO) {
    Long commentIdx = commentRequestDTO.getCommentIdx();
    FeedComment feedComment = userFeedCommentRepository.findByIdxAndDelYnFalse(commentIdx)
            .orElseThrow(IllegalArgumentException::new);
    feedComment.changeDelYn(true);
    feedComment = userFeedCommentRepository.save(feedComment);

    return CommentResponseDTO.builder()
            .commentIdx(feedComment.getIdx())
            .build();
  }
}
