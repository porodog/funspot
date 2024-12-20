package com.spot.fun.usr.custom.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.spot.fun.usr.custom.dto.CustomDTO;
import com.spot.fun.usr.custom.service.CustomService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/usr/custom")
public class CustomController {

   private final CustomService service;

   @GetMapping("/{cno}")
   public ResponseEntity<CustomDTO> get(@PathVariable("cno") Long cno, @RequestParam(required = false) Long userIdx) {
      CustomDTO customDTO = service.get(cno, userIdx);
      return ResponseEntity.ok(customDTO);
   }

   @GetMapping("/list")
   public ResponseEntity<List<CustomDTO>> list(@RequestParam(required = false) Long userIdx) {
      List<CustomDTO> customList = service.list(userIdx); // 🟢 서비스 호출
      return ResponseEntity.ok(customList); // 🟢 조회된 목록을 JSON 형태로 반환
   }

   @PostMapping("/")
   public ResponseEntity<Long> register(@RequestBody CustomDTO customDTO) {
      Long id = service.register(customDTO);
      return ResponseEntity.ok(id);
   }

   @PutMapping("/{cno}")
   public ResponseEntity<Long> update(@PathVariable("cno") Long cno, @RequestBody CustomDTO customDTO) {
      service.update(cno, customDTO);
      return ResponseEntity.ok(cno);
   }

   @PatchMapping("/{cno}")
   public ResponseEntity<String> delete(@PathVariable("cno") Long cno) {
      service.delete(cno);
      return ResponseEntity.ok("코스가 성공적으로 삭제되었습니다.");
   }
}
