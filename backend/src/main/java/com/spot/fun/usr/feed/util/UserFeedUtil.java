package com.spot.fun.usr.feed.util;

import com.spot.fun.usr.feed.repository.like.UserFeedLikeRepository;
import com.spot.fun.usr.user.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;
import java.util.Optional;

@Log4j2
@Component
@RequiredArgsConstructor
public class UserFeedUtil {
    private final UserFeedLikeRepository userFeedLikeRepository;

    public boolean isFeedLikedYn(Long feedIdx, Long userIdx) {
        boolean likedYn = false;
        if (!Objects.isNull(userIdx)) {
            likedYn = userFeedLikeRepository.existsByFeedIdxAndUserIdx(feedIdx, userIdx);
        }
        return likedYn;
    }

    public boolean isFeedCommentLikedYn(Long commentIdx, Long userIdx) {
        boolean likedYn = false;
        if (!Objects.isNull(userIdx)) {
            // 댓글 좋아요기능 사용여부 확인필요
            //likedYn = userFeedLikeRepository.existsByFeedIdxAndUserIdx(commentIdx, userIdx);
        }
        return likedYn;
    }

    public String getDateFormat(LocalDateTime localDateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yy.MM.dd HH:mm");
        return localDateTime.format(formatter);
    }

    public Long getLoginUserIdx(UserDTO userDTO) {
        return Optional.ofNullable(userDTO)
                .map(UserDTO::getIdx)
                .orElse(null);
    }
}
