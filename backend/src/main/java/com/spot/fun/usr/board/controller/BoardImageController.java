package com.spot.fun.usr.board.controller;

import com.spot.fun.file.FileUploadUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/images")
public class BoardImageController {

  @Value("${server.host.url}") // 서버 URL을 환경 변수 또는 프로퍼티에서 가져옴
  private String serverUrl;

  private final FileUploadUtil fileUploadUtil;

//  private static final String UPLOAD_DIR = "D:/final/pj.spot.fun/uploadFolder/board";
//  private static final Logger logger = Logger.getLogger(BoardImageController.class.getName());

  @PostMapping("/upload")
  public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
    try {
      log.info("요청이 들어옴: 파일 업로드 시작");
      String menuName = "board";
      List<Map<String, Object>> savedFiles = fileUploadUtil.saveFiles(List.of(file), menuName);

      if (savedFiles.isEmpty()) {
        throw new RuntimeException("파일 업로드 중 오류가 발생했습니다.");
      }

      String fileUrl = serverUrl + "/api/images/" + String.valueOf(savedFiles.get(0).get("uploadName")); // 서버 URL + 상대 경로

      return ResponseEntity.ok(Map.of("url", fileUrl));
    } catch (Exception e) {
      log.info("파일 업로드 실패: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/{fileName}")
  public ResponseEntity<Resource> getImage(@PathVariable("fileName") String fileName) {
    String menuType = "board";
    return fileUploadUtil.outputImage(menuType, fileName);
  }

//  @PostMapping("/upload")
//  public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
//    logger.info("요청이 들어옴: 파일 업로드 시작");
//
//    try {
//      logger.info("업로드 경로 확인: " + UPLOAD_DIR);
//
//      // 업로드 경로 설정
//      Path uploadPath = Paths.get(UPLOAD_DIR).toAbsolutePath().normalize();
//      if (!Files.exists(uploadPath)) {
//        Files.createDirectories(uploadPath);
//        logger.info("업로드 디렉토리 생성됨: " + uploadPath);
//      }
//
//      // 파일 저장
//      String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
//      Path filePath = uploadPath.resolve(fileName);
//      file.transferTo(filePath.toFile());
//      logger.info("파일 저장 완료: " + filePath);
//
//      // 절대 URL 반환
//      String fileUrl = serverUrl + "/uploads/board/" + fileName; // 서버 URL + 상대 경로
//      logger.info("반환할 파일 접근 URL: " + fileUrl);
//
//      Map<String, String> response = new HashMap<>();
//      response.put("url", fileUrl); // 프론트엔드에서 바로 사용할 수 있는 절대 URL 반환
//      return ResponseEntity.ok(response);
//
//    } catch (IOException e) {
//      logger.severe("파일 업로드 실패: " + e.getMessage());
//      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//    }
//  }
}
