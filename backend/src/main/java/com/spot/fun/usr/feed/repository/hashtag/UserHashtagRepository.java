package com.spot.fun.usr.feed.repository.hashtag;

import com.spot.fun.usr.feed.entity.hashtag.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserHashtagRepository extends JpaRepository<Hashtag, Long> {
    List<Hashtag> findByDelYnFalse();
}
