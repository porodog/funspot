package com.spot.fun.sample.repository;

import com.spot.fun.sample.entity.AuthToken;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<AuthToken, Long> {
    Optional<AuthToken> findByUserIdx(Long userIdx);
    Optional<AuthToken> findByRefreshToken(String refreshToken);
    boolean existsByUserIdx(Long userIdx);

    @Modifying
    @Transactional
    void deleteByUserIdx(Long userIdx);
}
