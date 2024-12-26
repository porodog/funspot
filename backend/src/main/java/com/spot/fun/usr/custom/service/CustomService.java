package com.spot.fun.usr.custom.service;

import com.spot.fun.paging.ScrollPagingUtil;
import com.spot.fun.usr.custom.dto.CustomDTO;
import com.spot.fun.usr.custom.dto.CustomResponseDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomService {
    Long register(CustomDTO customDTO);

    CustomDTO get(Long cno, Long userIdx);

   CustomResponseDTO list(Long userIdx, Pageable pageable, ScrollPagingUtil scrollPagingUtil);

    void update(Long cno, CustomDTO customDTO);

    void delete(Long cno);

    List<CustomDTO> listRecent(Long userIdx);
  
}
