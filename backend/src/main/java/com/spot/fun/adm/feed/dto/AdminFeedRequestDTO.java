package com.spot.fun.adm.feed.dto;

import com.spot.fun.usr.feed.dto.hashtag.FeedHashtagDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminFeedRequestDTO {
  private String searchType;
  private String searchValue;

  private int page = 1;
  private int size = 10;

  private Long idx;
  private Long userIdx;
  private String content;
  private List<Long> hashtagIdx;
  private List<Long> deleteFiles;
  private List<MultipartFile> uploadFiles;
  private List<FeedHashtagDTO> feedHashtags;
}
