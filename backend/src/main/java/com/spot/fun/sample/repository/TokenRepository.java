package com.spot.fun.sample.repository;

import com.spot.fun.sample.entity.AuthToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<AuthToken, Long> {
    Optional<AuthToken> findByUserIdx(Long userIdx);
    Optional<AuthToken> findByRefreshToken(String refreshToken);
}
