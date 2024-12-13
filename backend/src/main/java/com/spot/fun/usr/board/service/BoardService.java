package com.spot.fun.usr.board.service;

import com.spot.fun.usr.board.entity.BoardEntity;
import com.spot.fun.usr.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

  private final BoardRepository boardRepository;

  // 모든 게시글 조회 (최신순 정렬)
  public List<BoardEntity> getAllBoards() {
    return boardRepository.findByDelYnOrderByRegDateDesc("N"); // 최신순 정렬
  }

  // 게시글 작성
  public BoardEntity createBoard(BoardEntity board) {
    return boardRepository.save(board);
  }

  // 특정 게시글 조회
  public BoardEntity getBoardById(Long id) {
    return boardRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다. ID: " + id));
  }

  // 게시글 수정
  public BoardEntity updateBoard(Long id, BoardEntity updatedBoard) {
    BoardEntity existingBoard = getBoardById(id);
    existingBoard.setTitle(updatedBoard.getTitle());
    existingBoard.setContent(updatedBoard.getContent());
    existingBoard.setModDate(updatedBoard.getModDate());
    return boardRepository.save(existingBoard);
  }

  // 게시글 삭제 (논리 삭제)
  public void deleteBoard(Long id) {
    BoardEntity existingBoard = getBoardById(id);
    existingBoard.setDelYn("Y");
    boardRepository.save(existingBoard);
  }
}
