package com.spot.fun.usr.feed.dto;

import com.spot.fun.usr.feed.dto.comment.FeedCommentDTO;
import com.spot.fun.usr.feed.dto.hashtag.FeedHashtagDTO;
import com.spot.fun.usr.feed.dto.image.FeedImageDTO;
import com.spot.fun.usr.feed.util.UserFeedUtil;
import com.spot.fun.usr.user.dto.profile.UserProfileResponseDTO;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

//@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedDTO {
  private Long idx;
  private String content;
  private Boolean delYn;
  private LocalDateTime regDate;

  //private UserDTO user;
  private List<FeedCommentDTO> feedComments;
  private List<FeedImageDTO> feedImages;
  private List<MultipartFile> uploadFiles;

  private Long likeCount;
  private Long commentCount;
  private List<FeedHashtagDTO> feedHashtags;
  private Boolean likedYn;
  private String regDateStr;

  private List<Long> hashtagIdx;
  private List<Long> deleteFiles;

  private Long feedIdx;
  private Long likeIdx;
  private Long userIdx;
  private String userId;

  private UserProfileResponseDTO user;


  public FeedDTO(FeedDTO feedDTO, UserFeedUtil userFeedUtil) {
    this.idx = feedDTO.getIdx();
    this.content = feedDTO.getContent();
    this.delYn = feedDTO.getDelYn();
    this.regDateStr = userFeedUtil.getDateFormat(feedDTO.getRegDate());
    this.userId = feedDTO.getUserId();
  }

  public FeedDTO(Long idx, String content, Boolean delYn,LocalDateTime regDate, String userId) {
    this.idx = idx;
    this.content = content;
    this.delYn = delYn;
    this.regDate = regDate;
    this.userId = userId;
  }

}
