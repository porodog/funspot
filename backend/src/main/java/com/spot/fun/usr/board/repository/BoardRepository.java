package com.spot.fun.usr.board.repository;

import com.spot.fun.usr.board.entity.BoardCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<BoardCommentEntity, Long> {
}
