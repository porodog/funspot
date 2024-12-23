package com.spot.fun.usr.custom.service;

import java.util.List;

import com.spot.fun.usr.custom.dto.CustomDTO;

public interface CustomService {
    Long register(CustomDTO customDTO);

    CustomDTO get(Long cno, Long userIdx);

    List<CustomDTO> list(Long userIdx);

    void update(Long cno, CustomDTO customDTO);

    void delete(Long cno);
  
}
