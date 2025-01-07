package com.spot.fun.usr.spot.cotroller;

import com.spot.fun.usr.spot.dto.SpotItemResponseDTO;
import com.spot.fun.usr.spot.dto.SpotPostRequestDTO;
import com.spot.fun.usr.spot.service.SpotFacadeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/spot")
public class SpotController {
  private final SpotFacadeService spotFacadeService;

  // 내 스팟 아이템 조회
  @GetMapping("/getSpot/{spotId}")
  public SpotItemResponseDTO getSpot(@PathVariable("spotId") Long spotId){
    return spotFacadeService.getSpotItem(spotId);
  }

  // 내 스팟에 담기
  @PostMapping("/postSpot")
  public String postSpot(@RequestBody SpotPostRequestDTO spotPostRequestDTO){
    return spotFacadeService.postSpot(spotPostRequestDTO);
  }
}
