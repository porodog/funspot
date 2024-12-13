package com.spot.fun.usr.board.controller;

import com.spot.fun.usr.board.entity.BoardEntity;
import com.spot.fun.usr.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

  private final BoardService boardService;

  // 모든 게시글 조회
  @GetMapping
  public List<BoardEntity> getAllBoards() {
    return boardService.getAllBoards();
  }

  // 특정 게시글 조회
  @GetMapping("/{id}")
  public BoardEntity getBoardById(@PathVariable Long id) {
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
  @DeleteMapping("/{id}")
  public void deleteBoard(@PathVariable Long id) {
    boardService.deleteBoard(id);
  }
}
