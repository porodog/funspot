package com.spot.fun.usr.board.controller;

import com.spot.fun.usr.board.entity.BoardEntity;
import com.spot.fun.usr.board.repository.BoardRepository;
import com.spot.fun.usr.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

  private final BoardService boardService;
  private final BoardRepository boardRepository;

  // 모든 게시글 조회
  @GetMapping
  public Page<BoardEntity> getAllBoards(
          @RequestParam(value = "page", defaultValue = "0") int page,
          @RequestParam(value = "size", defaultValue = "10") int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("regDate").descending());
    return boardService.getAllBoards(pageable);
  }

  // 특정 게시글 조회
  @GetMapping("/{id}")
  public BoardEntity getBoardById(@PathVariable Long id) {
    BoardEntity board = boardService.incrementViewCount(id); // 조회수 증가
    return boardService.getBoardById(id);
  }

  // 게시글 작성
  @PostMapping
  public BoardEntity createBoard(@RequestBody BoardEntity board) {
    return boardService.createBoard(board);
  }

  // 게시글 수정
  @PutMapping("/{id}")
  public BoardEntity updateBoard(@PathVariable Long id, @RequestBody BoardEntity updatedBoard) {
    return boardService.updateBoard(id, updatedBoard);
  }

  // 게시글 삭제 (논리 삭제)
  @PatchMapping("/{id}/delete")
  public void deleteBoardByPatch(@PathVariable Long id) {
    boardService.deleteBoard(id);
  }

  @GetMapping("/paged")
  public Page<BoardEntity> getBoardsWithPaging(
          @RequestParam(value = "page", defaultValue = "0") int page,
          @RequestParam(value = "size", defaultValue = "10") int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("regDate").descending());
    return boardRepository.findByDelYn("N", pageable); // 논리 삭제된 게시글 제외
  }

  @GetMapping("/search")
  public Page<BoardEntity> searchBoards(
          @RequestParam(value = "page", defaultValue = "0") int page,
          @RequestParam(value = "size", defaultValue = "10") int size,
          @RequestParam(value = "type", defaultValue = "titleContent") String type,
          @RequestParam(value = "keyword", defaultValue = "") String keyword) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("regDate").descending());
    return boardService.searchBoards(type, keyword, pageable);
  }

}
