package com.spot.fun.usr.feed.util;

import com.spot.fun.config.jwt.JwtTokenProvider;
import com.spot.fun.config.jwt.JwtTokenUtil;
import com.spot.fun.usr.feed.repository.like.UserFeedLikeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

@Log4j2
@Component
@RequiredArgsConstructor
public class UserFeedUtil {
    private final JwtTokenProvider jwtTokenProvider;
    private final UserFeedLikeRepository userFeedLikeRepository;

    public boolean isLikedYn(Long feedIdx, Long userIdx) {
        boolean likedYn = false;
        if (!Objects.isNull(userIdx)) {
            likedYn = userFeedLikeRepository.existsByFeedIdxAndUserIdx(feedIdx, userIdx);
        }

        return likedYn;
    }

    public Long getUserIdx() {
        Long userIdx = null;
        String accessToken = JwtTokenUtil.getJwtToken();
        if(!StringUtils.isBlank(accessToken)) {
            userIdx = jwtTokenProvider.getUserIdx(accessToken);
        }

        return userIdx;
    }

    public String getDateFormat(LocalDateTime localDateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yy.MM.dd HH:mm");
        return localDateTime.format(formatter);
    }
}
