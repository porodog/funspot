package com.spot.fun.usr.board.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

  @Column(length = 100, nullable = false) // 제목은 최대 100자
  private String title;

  @Column(columnDefinition = "TEXT", nullable = false) // 내용은 TEXT 형식으로 설정
  private String content;

  @Column(length = 50, nullable = false) // 닉네임은 최대 50자
  private String nickname;

  @Column(name = "del_yn", nullable = false)
  private String delYn = "N"; // 기본값 'N'

  @Column(name = "reg_date", updatable = false)
  private LocalDateTime regDate = LocalDateTime.now();

  @Column(name = "mod_date", insertable = false, updatable = true)
  private LocalDateTime modDate; // 기본값 제거

  @Column(name = "view_count", nullable = false)
  private int viewCount = 0; // 기본값 0
}
