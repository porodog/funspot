package com.spot.fun.adm.feed.service;

import com.spot.fun.adm.feed.dto.AdminFeedRequestDTO;
import com.spot.fun.adm.feed.dto.AdminFeedResponseDTO;

public interface AdminFeedService {
  AdminFeedResponseDTO getList(AdminFeedRequestDTO adminFeedRequestDTO);
  AdminFeedResponseDTO getDetail(AdminFeedRequestDTO adminFeedRequestDTO);
}
