package com.spot.fun.usr.board.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_board")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long idx;

  @Column(length = 100, nullable = false)
  private String title;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String content;

  @Column(length = 50, nullable = false)
  private String nickname;

  @Column(name = "del_yn", nullable = false)
  private String delYn = "N";

  @Column(name = "reg_date", updatable = false)
  private LocalDateTime regDate = LocalDateTime.now();

  @Column(name = "mod_date", insertable = false, updatable = true)
  private LocalDateTime modDate;

  @Column(name = "view_count", nullable = false)
  private long viewCount = 0;

  @Column(name = "like_count", nullable = false)
  private long likeCount = 0;

  @Column(name = "author_idx", nullable = false)
  private Long authorIdx; // 작성자의 userIdx
}
