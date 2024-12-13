package com.spot.fun.usr.user.entity;

import com.spot.fun.usr.user.dto.UserDTO;
import com.spot.fun.usr.user.dto.UserRole;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

@Table(name = "tbl_user")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class User implements UserDetails  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx", unique = true, updatable = false)
    private Long idx;

    @Column(name = "user_id", nullable = false, unique = true)
    private String userId;

    @Column(name = "password")
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String birthDate;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false)
    private String zonecode;

    @Column(nullable = false)
    private String address;

    @Column
    private String detaileAdd;

    @Column(name = "user_role")
    @Enumerated(EnumType.STRING)
    private UserRole userRole = UserRole.ROLE_USER;

    @Column
    private String provider;

    @CreationTimestamp
    @Column(name = "reg_date")
    private LocalDateTime regDate;

    @UpdateTimestamp
    @Column(name = "mod_date")
    private LocalDateTime modDate;

    @Builder
    public User(Long idx, String userId, String password, String name, String birthDate,
                String nickname, String email, String phone, String zonecode,
                String address, String detaileAdd, UserRole userRole, String provider) {
        this.idx = idx;
        this.userId = userId;
        this.name = name;
        this.password = password;
        this.birthDate = birthDate;
        this.nickname = nickname;
        this.email = email;
        this.phone = phone;
        this.zonecode = zonecode;
        this.address = address;
        this.detaileAdd = detaileAdd;
        this.provider = provider;
        this.userRole = userRole;
    }

    // OAuth 전용 최소 생성자 추가
    public User(String email, String nickname, String provider) {
        this.email = email;
        this.nickname = nickname;
        this.provider = provider;
        this.userId = email; // 이메일을 userId로 사용
        this.userRole = UserRole.ROLE_USER; // 기본 역할 설정
    }

    public void updatePassword(String encodedPassword) {
        this.password = encodedPassword;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
//      return List.of(new SimpleGrantedAuthority("user"));
        return Collections.singleton(new SimpleGrantedAuthority(userRole.getRole()));
    }

    @Override
    public String getUsername() {
        return userId;
    }

    public UserDTO toDTO() {
        return UserDTO.builder()
                .userId(this.userId)
                .password(this.password)
                .userRole(this.userRole)
                .provider(this.provider != null ? this.provider : "LOCAL") // 기본값 설정
                .build();
    }


}