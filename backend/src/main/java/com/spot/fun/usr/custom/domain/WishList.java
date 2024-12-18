package com.spot.fun.usr.custom.domain;

import com.spot.fun.usr.custom.dto.WishListDTO;
import com.spot.fun.usr.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_wishlist")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishList {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "user_id", nullable = false)
   private User user;

   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "custom_id", nullable = false)
   private Custom custom;

   @Column(name = "created_at", updatable = false)
   private LocalDateTime createdAt;

   @PrePersist
   protected void onCreate() {
      this.createdAt = LocalDateTime.now();
   }

   public WishListDTO toDTO() {
      return WishListDTO.builder()
              .id(this.id)
              .customCno(this.custom.getCno())
              .title(this.custom.getTitle())
              .build();
   }
}
