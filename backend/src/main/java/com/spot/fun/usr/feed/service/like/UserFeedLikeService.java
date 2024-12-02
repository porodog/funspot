package com.spot.fun.usr.feed.service.like;

public interface UserFeedLikeService {
  boolean insert(Long idx, Long userIdx);
  boolean delete(Long idx, Long userIdx);
}
