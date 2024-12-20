package com.spot.fun.usr.custom.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spot.fun.usr.custom.domain.Custom;
import org.springframework.data.jpa.repository.Query;

public interface CustomRepository extends JpaRepository<Custom, Long> {
  Optional<Custom> findById(Long cno);

   @Query("SELECT c FROM Custom c WHERE c.delYn = 'N'")
   List<Custom> findAllNotDeleted();
  
}
