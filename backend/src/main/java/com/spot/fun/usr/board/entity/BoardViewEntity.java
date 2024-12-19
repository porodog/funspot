package com.spot.fun.usr.board.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_board_view")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardViewEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long idx;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "board_idx", nullable = false) // 게시글 ID
  private BoardEntity board;

  @Column(name = "user_idx", nullable = false) // 사용자 ID
  private Long userIdx;

  @Column(name = "view_date", nullable = false)
  private LocalDateTime viewDate; // 조회한 시간
}
