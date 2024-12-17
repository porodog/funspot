package com.spot.fun.usr.board.service;

import com.spot.fun.usr.board.entity.BoardEntity;
import com.spot.fun.usr.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BoardService {

  private final BoardRepository boardRepository;

  // 모든 게시글 조회 (최신순 정렬)
  public Page<BoardEntity> getAllBoards(Pageable pageable) {
    return boardRepository.findByDelYn("N", pageable); // 페이징된 결과 반환
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

    // 수정 데이터 반영
    existingBoard.setTitle(updatedBoard.getTitle());
    existingBoard.setContent(updatedBoard.getContent());
    existingBoard.setModDate(LocalDateTime.now()); // 수정일자 현재 시간으로 설정

    return boardRepository.save(existingBoard);
  }

  // 게시글 삭제 (논리 삭제)
  public void deleteBoard(Long id) {
    BoardEntity existingBoard = getBoardById(id);
    existingBoard.setDelYn("Y");
    boardRepository.save(existingBoard);
  }

  // 조회수 증가
  public BoardEntity incrementViewCount(Long id) {
    BoardEntity board = getBoardById(id);
    board.setViewCount(board.getViewCount() + 1);
    return boardRepository.save(board);
  }

  // 검색 기능
  public Page<BoardEntity> searchBoards(String type, String keyword, Pageable pageable) {
    switch (type) {
      case "titleContent":
        return boardRepository.searchByTitleOrContent(keyword, pageable);
      case "title":
        return boardRepository.searchByTitle(keyword, pageable);
      case "content":
        return boardRepository.searchByContent(keyword, pageable);
      case "nickname":
        return boardRepository.searchByNickname(keyword, pageable);
      default:
        return boardRepository.findByDelYn("N", pageable); // 기본적으로 모든 게시글 조회
    }
  }
}
