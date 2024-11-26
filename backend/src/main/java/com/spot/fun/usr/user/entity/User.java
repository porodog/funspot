package com.spot.fun.usr.user.entity;

import com.spot.fun.usr.user.dto.UserDTO;
import com.spot.fun.usr.user.dto.UserRole;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

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

    @Column(name = "user_role")
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Builder
    public User(String userId, String password, UserRole userRole) {
        this.userId = userId;
        this.password = password;
        this.userRole = userRole;
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
                    .build();
    }
}
