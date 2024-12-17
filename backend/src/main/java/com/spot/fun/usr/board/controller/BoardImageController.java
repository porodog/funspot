package com.spot.fun.usr.board.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/images")
public class BoardImageController {

  @Value("${server.host.url}") // 서버 URL을 환경 변수 또는 프로퍼티에서 가져옴
  private String serverUrl;

  private static final String UPLOAD_DIR = "D:/final/pj.spot.fun/uploadFolder/board";
  private static final Logger logger = Logger.getLogger(BoardImageController.class.getName());

  @PostMapping("/upload")
  public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
    logger.info("요청이 들어옴: 파일 업로드 시작");

    try {
      logger.info("업로드 경로 확인: " + UPLOAD_DIR);

      // 업로드 경로 설정
      Path uploadPath = Paths.get(UPLOAD_DIR).toAbsolutePath().normalize();
      if (!Files.exists(uploadPath)) {
        Files.createDirectories(uploadPath);
        logger.info("업로드 디렉토리 생성됨: " + uploadPath);
      }

      // 파일 저장
      String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
      Path filePath = uploadPath.resolve(fileName);
      file.transferTo(filePath.toFile());
      logger.info("파일 저장 완료: " + filePath);

      // 절대 URL 반환
      String fileUrl = serverUrl + "/uploads/board/" + fileName; // 서버 URL + 상대 경로
      logger.info("반환할 파일 접근 URL: " + fileUrl);

      Map<String, String> response = new HashMap<>();
      response.put("url", fileUrl); // 프론트엔드에서 바로 사용할 수 있는 절대 URL 반환
      return ResponseEntity.ok(response);

    } catch (IOException e) {
      logger.severe("파일 업로드 실패: " + e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
