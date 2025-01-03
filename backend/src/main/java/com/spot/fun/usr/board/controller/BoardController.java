package com.spot.fun.usr.board.controller;

import com.spot.fun.usr.board.dto.BoardDTO;
import com.spot.fun.usr.board.entity.BoardEntity;
import com.spot.fun.usr.board.repository.BoardLikeRepository;
import com.spot.fun.usr.board.repository.BoardRepository;
import com.spot.fun.usr.board.service.BoardService;
import com.spot.fun.usr.user.dto.UserDTO;
import com.spot.fun.usr.user.dto.profile.UserProfileDTO;
import com.spot.fun.usr.user.dto.profile.UserProfileRequestDTO;
import com.spot.fun.usr.user.dto.profile.UserProfileResponseDTO;
import com.spot.fun.usr.user.service.profile.UserProfileService;
import com.sun.security.auth.UserPrincipal;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

  private final BoardService boardService;
  private final BoardRepository boardRepository;
  private final BoardLikeRepository boardLikeRepository;
  private final UserProfileService userProfileService;

  // 모든 게시글 조회
  @GetMapping
  public Page<BoardDTO> getAllBoards(
          @RequestParam(value = "page", defaultValue = "0") int page,
          @RequestParam(value = "size", defaultValue = "10") int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("regDate").descending());
    return boardService.getAllBoards(pageable); // 이제 타입이 일치
  }


  // 특정 게시글 조회
  @GetMapping("/{id}")
  public ResponseEntity<BoardEntity> getBoardById(@PathVariable("id") Long id) {
    BoardEntity board = boardService.getBoardById(id);
    return ResponseEntity.ok(board);
  }

  // 게시글 작성
  @PostMapping
  public ResponseEntity<?> createBoard(@RequestBody BoardEntity board) {
    try {
      BoardEntity createdBoard = boardService.createBoard(board);
      return ResponseEntity.status(HttpStatus.CREATED).body(createdBoard);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("게시글 생성에 실패했습니다: " + e.getMessage());
    }
  }

  // 게시글 수정
  @PutMapping("/{id}")
  public BoardEntity updateBoard(@PathVariable("id") Long id, @RequestBody BoardEntity updatedBoard) {
    return boardService.updateBoard(id, updatedBoard);
  }

  // 게시글 삭제 (논리 삭제)
  @PatchMapping("/{id}/delete")
  public void deleteBoardByPatch(@PathVariable("id") Long id) {
    boardService.deleteBoard(id);
  }

  @GetMapping("/paged")
  public Page<BoardEntity> getBoardsWithPaging(
          @RequestParam(value = "page", defaultValue = "0") int page,
          @RequestParam(value = "size", defaultValue = "10") int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("regDate").descending());
    return boardRepository.findByDelYn("N", pageable); // 논리 삭제된 게시글 제외
  }

  // 게시글 검색
  @GetMapping("/search")
  public Page<BoardEntity> searchBoards(
          @RequestParam(value = "page", defaultValue = "0") int page,
          @RequestParam(value = "size", defaultValue = "10") int size,
          @RequestParam(value = "type", defaultValue = "titleContent") String type,
          @RequestParam(value = "keyword", defaultValue = "") String keyword) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("regDate").descending());
    return boardService.searchBoards(type, keyword, pageable);
  }

  // 게시글 추천 상태 확인
  @GetMapping("/{boardIdx}/has-liked")
  public ResponseEntity<Map<String, Boolean>> hasLiked(
          @PathVariable("boardIdx") Long boardIdx,
          @RequestParam(value = "userIdx") Long userIdx
  ) {
    boolean hasLiked = boardLikeRepository.existsByBoardIdxAndUserIdx(boardIdx, userIdx);
    Map<String, Boolean> response = new HashMap<>();
    response.put("hasLiked", hasLiked);
    return ResponseEntity.ok(response);
  }

  // 게시글 추천
  @PostMapping("/{boardIdx}/like")
  public ResponseEntity<Void> likeBoard(@PathVariable(name = "boardIdx") Long boardIdx, @RequestParam(value = "userIdx") Long userIdx) {
    boardService.likeBoard(boardIdx, userIdx);
    return ResponseEntity.ok().build();
  }
  // 게시글 조회수 중복 카운팅 방지
  @GetMapping("/{boardIdx}/view")
  public ResponseEntity<Void> incrementViewCount(
          @PathVariable("boardIdx") Long boardIdx,
          @RequestParam(value = "userIdx") Long userIdx,
          HttpServletRequest request,
          HttpServletResponse response
  ) {
    boardService.incrementViewCount(boardIdx, userIdx, request, response);
    return ResponseEntity.ok().build();
  }

  //댓글+대댓글
  @GetMapping("/boards")
  public ResponseEntity<List<BoardDTO>> getBoards() {
    List<BoardDTO> boardList = boardService.getBoardList();

    // 디버깅: 반환 데이터 로그 출력
    boardList.forEach(board -> System.out.println("BoardDTO: " + board));

    return ResponseEntity.ok(boardList);
  }

  @GetMapping("/profile/by-nickname/{nickname}")
  public ResponseEntity<String> getUserProfileByNickname(@PathVariable("nickname") String nickname) {
    try {
      // UserProfileService를 사용하여 프로필 정보를 가져옵니다.
      UserProfileResponseDTO userProfile = userProfileService.getProfileByNickname(nickname);

      // 프로필 이미지의 업로드 이름을 반환합니다.
      if (userProfile != null && userProfile.getUploadName() != null) {
        return ResponseEntity.ok(userProfile.getUploadName());
      } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profile image not found");
      }
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
    }
  }


}





