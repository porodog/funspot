package com.spot.fun.usr.feed.service.comment;

import com.spot.fun.usr.feed.dto.comment.FeedCommentDTO;
import com.spot.fun.usr.feed.repository.comment.UserFeedCommentRepository;
import com.spot.fun.usr.feed.util.UserFeedUtil;
import com.spot.fun.usr.user.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserFeedCommentServiceImpl implements UserFeedCommentService {

    private final UserFeedCommentRepository userFeedCommentRepository;
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
}
