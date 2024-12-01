package com.spot.fun.usr.feed.repository.like;

import com.spot.fun.usr.feed.entity.like.FeedLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserFeedLikeRepository extends JpaRepository<FeedLike, Long> {
    Long countByFeedIdx(Long feedIdx);
    boolean existsByFeedIdxAndUserIdx(Long feedIdx, Long userIdx);
}
