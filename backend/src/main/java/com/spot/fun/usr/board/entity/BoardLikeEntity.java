package com.spot.fun.usr.board.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tbl_board_like") // 테이블 이름 설정
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardLikeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long idx;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "board_idx", nullable = false) // tbl_board의 기본 키 'idx'를 FK로 설정
  private BoardEntity board;

  @Column(name = "user_idx", nullable = false) // 추천한 사용자 ID
  private Long userIdx;


}
