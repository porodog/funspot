package com.spot.fun.usr.spot.cotroller;

import com.spot.fun.usr.spot.entity.Spot;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/spot")
public class SpotController {

  @GetMapping("/getSpotList/{userIdx}")
  public void getSpotList(@PathVariable("userIdx") Long userIdx){

  }

  @GetMapping("/getSpot/{userIdx}/{spotId}")
  public void getSpot(@PathVariable("userIdx") Long userIdx, @PathVariable("spotId") Long spotId){

  }

  @PostMapping("/postSpot")
  public long postSpot(@RequestBody Spot spot){
    long status = 0;

    return status;
  }
}
