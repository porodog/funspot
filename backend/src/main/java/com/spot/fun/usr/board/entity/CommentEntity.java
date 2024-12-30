package com.spot.fun.usr.board.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_board_comments")
@Getter
@Setter
@NoArgsConstructor
public class CommentEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "board_idx", referencedColumnName = "idx", nullable = false) // 수정된 부분
  private BoardEntity board;

  @ManyToOne
  @JoinColumn(name = "parent_id")
  @JsonBackReference
  private CommentEntity parent;

  @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference
  private List<CommentEntity> replies = new ArrayList<>();

  @Column(nullable = false)
  private String content;

  @Column(nullable = false)
  private String author;

  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(nullable = false)
  private LocalDateTime updatedAt = LocalDateTime.now();

  // 논리적 삭제를 위한 컬럼, 기본값은 'n' (삭제되지 않은 상태)
  @Column(nullable = false, columnDefinition = "CHAR(1) DEFAULT 'n'")
  private String delYn = "n";

  @PreUpdate
  public void preUpdate() {
    this.updatedAt = LocalDateTime.now();
  }

  public String getAuthorNickname() {
    return this.author != null ? this.author : "익명";
  }

}
