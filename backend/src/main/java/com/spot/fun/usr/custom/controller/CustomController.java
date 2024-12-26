package com.spot.fun.usr.custom.controller;

import java.util.List;

import com.spot.fun.paging.ScrollPagingUtil;
import com.spot.fun.usr.custom.dto.CustomResponseDTO;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
   public ResponseEntity<CustomResponseDTO> list(
           @RequestParam(defaultValue = "cno,desc") String sort,
           @RequestParam(required = false) Long userIdx,
           ScrollPagingUtil scrollPagingUtil
           ) {
      Pageable pageable = PageRequest.of(0, scrollPagingUtil.getPageSize(), Sort.by("cno").descending());
      scrollPagingUtil.setPageSize(3);
      CustomResponseDTO customDTOPage = service.list(userIdx, pageable, scrollPagingUtil);

      return ResponseEntity.ok(customDTOPage);
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

   @GetMapping("/list/recent")
   public ResponseEntity<List<CustomDTO>> listRecent(@RequestParam(required = false) Long userIdx) {
      List<CustomDTO> customList = service.listRecent(userIdx);
      return ResponseEntity.ok(customList);
   }
}
