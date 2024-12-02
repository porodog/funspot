package com.spot.fun.usr.feed.service.comment;

import com.spot.fun.usr.feed.dto.comment.FeedCommentDTO;
import com.spot.fun.usr.feed.entity.Feed;
import com.spot.fun.usr.feed.entity.comment.FeedComment;
import com.spot.fun.usr.feed.repository.UserFeedRepository;
import com.spot.fun.usr.feed.repository.comment.UserFeedCommentRepository;
import com.spot.fun.usr.feed.util.UserFeedUtil;
import com.spot.fun.usr.user.dto.UserDTO;
import com.spot.fun.usr.user.entity.User;
import com.spot.fun.usr.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserFeedCommentServiceImpl implements UserFeedCommentService {

  private final UserFeedCommentRepository userFeedCommentRepository;
  private final UserFeedRepository userFeedRepository;
  private final UserRepository userRepository;

  private final UserFeedUtil userFeedUtil;

  @Override
  public List<FeedCommentDTO> getCommentList(Long idx) {
    Long userIdx = userFeedUtil.getUserIdx();

    return userFeedCommentRepository.findByFeedIdxAndDelYnFalse(idx).stream()
            .map((comment) ->
                    FeedCommentDTO.builder()
                            .idx(comment.getIdx())
                            .content(comment.getContent())
                            .regDateStr(userFeedUtil.getDateFormat(comment.getRegDate()))
                            .likedYn(userFeedUtil.isFeedCommentLikedYn(comment.getIdx(), userIdx))
                            .user(UserDTO.builder()
                                    .idx(comment.getUser().getIdx())
                                    .userId(comment.getUser().getUserId())
                                    //.name(comment.getUser().getName())
                                    .nickname(comment.getUser().getNickname())
                                    .build())
                            .build()
            ).toList();
  }

  @Transactional
  @Override
  public FeedCommentDTO insert(FeedCommentDTO feedCommentDTO) {
    Long userIdx = userFeedUtil.getUserIdx();

    try {
      Feed feed = userFeedRepository.findByIdxAndDelYnFalse(feedCommentDTO.getIdx())
              .orElseThrow(IllegalArgumentException::new);
      User user = userRepository.findByIdx(userIdx)
              .orElseThrow(IllegalArgumentException::new);

      FeedComment comment = userFeedCommentRepository.save(
              FeedComment.builder()
                      .content(feedCommentDTO.getContent())
                      .feed(feed)
                      .user(user)
                      .build());

      return FeedCommentDTO.builder()
              .idx(comment.getIdx())
              .content(comment.getContent())
              .regDateStr(userFeedUtil.getDateFormat(comment.getRegDate()))
              .likedYn(false)
              .user(UserDTO.builder()
                      .idx(comment.getUser().getIdx())
                      .userId(comment.getUser().getUserId())
                      //.name(comment.getUser().getName())
                      .nickname(comment.getUser().getNickname())
                      .build())
              .build();
    } catch (Exception e) {
      log.info("comment insert error .. {}", e.getMessage());
      return new FeedCommentDTO();
    }
  }
}
