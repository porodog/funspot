package com.spot.fun.usr.board.service;

import com.spot.fun.usr.board.dto.BoardDTO;
import com.spot.fun.usr.board.entity.BoardEntity;
import com.spot.fun.usr.board.entity.BoardLikeEntity;
import com.spot.fun.usr.board.entity.BoardViewEntity;
import com.spot.fun.usr.board.repository.BoardLikeRepository;
import com.spot.fun.usr.board.repository.BoardRepository;
import com.spot.fun.usr.board.repository.BoardViewRepository;
import com.spot.fun.usr.board.repository.CommentRepository;
import com.spot.fun.usr.board.util.BoardUtil;
import com.spot.fun.usr.user.entity.User;
import com.spot.fun.usr.user.repository.UserRepository;
import com.spot.fun.usr.user.repository.profile.UserProfileRepository;
import com.spot.fun.usr.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardService {

  private final BoardRepository boardRepository;
  private final BoardLikeRepository boardLikeRepository;
  private final BoardViewRepository boardViewRepository;
  private final BoardUtil boardUtil;
  private final UserRepository userRepository;
  private final CommentRepository commentRepository;
  private final UserProfileRepository userProfileRepository;

  // 모든 게시글 조회 (최신순 정렬)
  public Page<BoardDTO> getAllBoards(Pageable pageable) {
    List<Object[]> results = boardRepository.findAllWithAuthorIdx(pageable);

    List<BoardDTO> boardDTOs = results.stream().map(result -> {
      BoardEntity board = (BoardEntity) result[0];
      Long authorIdx = (Long) result[1];


      // 댓글 수 조회
      long commentCount = commentRepository.countByBoardIdxAndDelYn(board.getIdx(), "N");

      return BoardDTO.builder()
              .idx(board.getIdx())
              .title(board.getTitle())
              .content(board.getContent())
              .nickname(board.getNickname())
              .authorIdx(authorIdx)
              .regDate(board.getRegDate().toString())
              .modDate(board.getModDate() != null ? board.getModDate().toString() : null)
              .likeCount(board.getLikeCount())
              .viewCount(board.getViewCount())
              .commentCount(commentCount) // 댓글 수 추가
              .build();
    }).collect(Collectors.toList());

    long totalElements = boardRepository.countByDelYn("N");

    return new PageImpl<>(boardDTOs, pageable, totalElements);
  }


  // 게시글 작성
  public BoardEntity createBoard(BoardEntity board) {
    log.info("저장 전 BoardEntity: {}", board);

    // 닉네임으로 User 조회
    User user = userRepository.findByNickname(board.getNickname());
    if (user == null) {
      log.error("해당 닉네임을 가진 사용자를 찾을 수 없습니다: {}", board.getNickname());
      throw new RuntimeException("해당 닉네임을 가진 사용자를 찾을 수 없습니다: " + board.getNickname());
    }

    board.setAuthorIdx(user.getIdx());
    board.setRegDate(LocalDateTime.now());

    BoardEntity savedBoard = boardRepository.save(board);
    log.info("저장된 BoardEntity: {}", savedBoard);

    return savedBoard;
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
  public BoardEntity incrementViewCount(Long boardIdx, Long userIdx , HttpServletRequest request, HttpServletResponse response) {

    if (userIdx == 0) {
      boardUtil.readCount(boardIdx, request, response);
    } else {
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
    }

    return boardRepository.findById(boardIdx)
            .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
  }

  public List<BoardDTO> getBoardList() {
    List<Object[]> results = boardRepository.getBoardListWithCommentCount();
    // 디버깅: 쿼리 결과 로그 출력
    System.out.println("Query Results: " + results);

    return results.stream()
            .map(result -> {
              BoardEntity board = (BoardEntity) result[0];
              long commentCount = result[1] != null ? (Long) result[1] : 0L; // 댓글 수를 long으로 처리

              // 디버깅: 각 결과 로그 출력
              System.out.println("Board: " + board.getIdx() + ", CommentCount: " + commentCount);

              return BoardDTO.builder()
                      .idx(board.getIdx())
                      .title(board.getTitle())
                      .content(board.getContent())
                      .nickname(board.getNickname())
                      .regDate(board.getRegDate().toString())
                      .modDate(board.getModDate() != null ? board.getModDate().toString() : null)
                      .commentCount(commentCount) // 댓글 수 추가
                      .build();
            })
            .collect(Collectors.toList());
  }

}