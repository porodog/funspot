package com.spot.fun.usr.feed.service.like;

import com.spot.fun.usr.feed.entity.Feed;
import com.spot.fun.usr.feed.entity.like.FeedLike;
import com.spot.fun.usr.feed.repository.UserFeedRepository;
import com.spot.fun.usr.feed.repository.like.UserFeedLikeRepository;
import com.spot.fun.usr.feed.util.UserFeedUtil;
import com.spot.fun.usr.user.entity.User;
import com.spot.fun.usr.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserFeedLikeServiceImpl implements UserFeedLikeService {

  private final UserFeedRepository userFeedRepository;
  private final UserFeedLikeRepository userFeedLikeRepository;
  private final UserRepository userRepository;

  private final UserFeedUtil userFeedUtil;

  @Transactional
  @Override
  public boolean insert(Long idx, Long userIdx) {
    try {
      Feed feed = userFeedRepository.findByIdxAndDelYnFalse(idx)
              .orElseThrow(IllegalArgumentException::new);
      User user = userRepository.findByIdx(userIdx)
              .orElseThrow(IllegalArgumentException::new);

      userFeedLikeRepository.save(FeedLike.builder()
              .feed(feed)
              .user(user)
              .build());
      return true;
    } catch (Exception e) {
      log.info("like insert error .. {}", e.getMessage());
      return false;
    }
  }

  @Transactional
  @Override
  public boolean delete(Long idx, Long userIdx) {
    try {
      userFeedLikeRepository.deleteByFeedIdxAndUserIdx(idx, userIdx);
      return true;
    } catch (Exception e) {
      log.info("like delete error .. {}", e.getMessage());
      return false;
    }
  }
}
