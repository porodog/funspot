package com.spot.fun.usr.board.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_board") // 테이블 이름 설정
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long idx;

  private String title;
  private String content;
  private String nickname;

  @Column(name = "del_yn", nullable = false)
  private String delYn = "N"; // 기본값 'N'

  @Column(name = "reg_date", updatable = false)
  private LocalDateTime regDate = LocalDateTime.now();

  @Column(name = "mod_date")
  private LocalDateTime modDate = LocalDateTime.now();
}
