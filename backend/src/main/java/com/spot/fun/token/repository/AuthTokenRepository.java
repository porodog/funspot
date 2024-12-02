package com.spot.fun.token.repository;

import com.spot.fun.token.entity.AuthToken;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;

public interface AuthTokenRepository extends JpaRepository<AuthToken, Long> {
    Optional<AuthToken> findByUserIdx(Long userIdx);
    Optional<AuthToken> findByRefreshToken(String refreshToken);
    boolean existsByUserIdx(Long userIdx);
    boolean existsByRefreshToken(String refreshToken);

    @Modifying
    @Transactional
    void deleteByUserIdx(Long userIdx);

    @Modifying
    @Transactional
    void deleteByRefreshToken(String refreshToken);
}
