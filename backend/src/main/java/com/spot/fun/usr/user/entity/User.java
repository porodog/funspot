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
public class User implements UserDetails {
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

    @Column(name = "use_yn", nullable = false)
    private String useYn = "Y"; // 기본값: 활성 상태 ('Y' → 활성, 'N' → 비활성)

    // 회원 비활성화 메서드 추가
    public void deactivate(String n) {
        this.useYn = "N";
    }

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

    // 상태(useYn) 변경 메서드
    public User changeUseYn(String newUseYn) {
        if (!"Y".equals(newUseYn) && !"N".equals(newUseYn)) {
            throw new IllegalArgumentException("유효하지 않은 상태 값입니다. 'Y' 또는 'N'만 허용됩니다.");
        }

        this.useYn = newUseYn; // this를 통해 private 필드에 안전하게 접근
        return this; // 변경된 객체를 반환
    }

    // 권한(userRole) 변경 메서드
    public User changeUserRole(UserRole newUserRole) {
        if (newUserRole == null) {
            throw new IllegalArgumentException("유효하지 않은 역할입니다.");
        }

        this.userRole = newUserRole; // this를 통해 private 필드에 안전하게 접근
        return this; // 변경된 객체를 반환
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

    public void updatePhone(String phone) {
        this.phone = phone;
    }

    public void updateAddress(String zonecode, String address, String detaileAdd) {
        this.zonecode = zonecode;
        this.address = address;
        this.detaileAdd = detaileAdd;
    }


    public UserDTO toDTO() {
        return UserDTO.builder()
                .idx(idx)
                .nickname(nickname)
                .userId(this.userId)
                .password(this.password)
                .userRole(this.userRole)
                .provider(this.provider != null ? this.provider : "LOCAL") // 기본값 설정
                .build();
    }


}