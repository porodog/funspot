package com.spot.fun.usr.feed.service;

import com.spot.fun.usr.feed.dto.FeedDTO;
import com.spot.fun.usr.feed.repository.UserFeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserFeedServiceImpl implements UserFeedService {
  private final UserFeedRepository userFeedRepository;

  @Override
  public List<FeedDTO> getList() {
    List<FeedDTO> list = userFeedRepository.findAll()
            .stream().map((item) -> {
              System.out.println(item.toString());
              return FeedDTO.builder()
                      .idx(item.getIdx())
                      .content(item.getContent())
                      .delYn(item.isDelYn())
                      .user(item.getUser())
                      .build();
            }).toList();
    return list;
  }
}
