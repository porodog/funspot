package com.spot.fun.usr.board.service;

import com.spot.fun.usr.board.entity.BoardEntity;
import com.spot.fun.usr.board.entity.BoardLikeEntity;
import com.spot.fun.usr.board.entity.BoardViewEntity;
import com.spot.fun.usr.board.repository.BoardLikeRepository;
import com.spot.fun.usr.board.repository.BoardRepository;
import com.spot.fun.usr.board.repository.BoardViewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BoardService {

  private final BoardRepository boardRepository;
  private final BoardLikeRepository boardLikeRepository;
  private final BoardViewRepository boardViewRepository;

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
    @Transactional
    // 추천 상태 확인
    public boolean hasLiked(Long boardIdx, Long userIdx) {
      return boardLikeRepository.existsByBoardIdxAndUserIdx(boardIdx, userIdx);
    }

  // 추천 처리
  public void likeBoard(Long boardIdx, Long userIdx) {
    if (hasLiked(boardIdx, userIdx)) {
      throw new IllegalStateException("이미 추천한 게시글입니다.");
    }

    // 추천 엔티티 저장
    BoardEntity board = boardRepository.findById(boardIdx)
            .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
    BoardLikeEntity likeEntity = BoardLikeEntity.builder()
            .board(board)
            .userIdx(userIdx)
            .build();
    boardLikeRepository.save(likeEntity);

    // 추천 수 증가
    board.setLikeCount(board.getLikeCount() + 1);
    boardRepository.save(board);
  }
  @Transactional
  public BoardEntity incrementViewCount(Long boardIdx, Long userIdx) {
    // 이미 조회한 기록이 있는지 확인
    boolean alreadyViewed = boardViewRepository.existsByBoardIdxAndUserIdx(boardIdx, userIdx);

    if (!alreadyViewed) {
      // 조회 기록 추가
      BoardEntity board = boardRepository.findById(boardIdx)
              .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

      BoardViewEntity boardView = BoardViewEntity.builder()
              .board(board)
              .userIdx(userIdx)
              .viewDate(LocalDateTime.now())
              .build();
      boardViewRepository.save(boardView);

      // 조회수 증가
      board.setViewCount(board.getViewCount() + 1);
      boardRepository.save(board);
    }

    return boardRepository.findById(boardIdx)
            .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
  }
}