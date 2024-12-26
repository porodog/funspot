package com.spot.fun.usr.board.util;

import com.spot.fun.usr.board.entity.BoardEntity;
import com.spot.fun.usr.board.repository.BoardRepository;
import com.spot.fun.usr.board.service.BoardService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

@Log4j2
@Component
@RequiredArgsConstructor
public class BoardUtil {
  private final BoardRepository boardRepository;

  public void readCount(Long board_idx, HttpServletRequest request, HttpServletResponse response) {

//조회수 중복 체크
    Cookie oldCookie = null;
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if (cookie.getName().equals("postView")) {
          oldCookie = cookie;
        }
      }
    }

    if (oldCookie != null) {
      if (!oldCookie.getValue().contains("[" + board_idx + "]")) {
        //조회수 증가
        incrementViewCount(board_idx);
        oldCookie.setValue(oldCookie.getValue() + "_[" + board_idx + "]");
        oldCookie.setPath("/");
        oldCookie.setMaxAge(60 * 60 * 24);
        response.addCookie(oldCookie);
      }
    } else {
      //조회수 증가
      incrementViewCount(board_idx);
      Cookie newCookie = new Cookie("postView","[" + board_idx + "]");
      newCookie.setPath("/");
      newCookie.setMaxAge(60 * 60 * 24);
      response.addCookie(newCookie);
    }
  }

  private BoardEntity incrementViewCount(Long id) {
    BoardEntity board =  boardRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다. ID: " + id));;
    board.setViewCount(board.getViewCount() + 1);
    return boardRepository.save(board);
  }
}
