package com.spot.fun.usr.feed.repository;

import com.spot.fun.usr.feed.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserFeedRepository extends JpaRepository<Feed, Long> {

}
