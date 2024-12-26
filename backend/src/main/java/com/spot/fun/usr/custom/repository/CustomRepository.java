package com.spot.fun.usr.custom.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spot.fun.usr.custom.domain.Custom;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface CustomRepository extends JpaRepository<Custom, Long> {
   Optional<Custom> findById(Long cno);
   List<Custom> findAllByOrderByCnoDesc();
   List<Custom> findTop10ByDelYnOrderByCnoDesc(String delYn);
   @Query("SELECT c FROM Custom c JOIN FETCH c.customPlaces cp JOIN FETCH cp.place WHERE c.cno IN :customIds AND c.delYn = 'N'")
   List<Custom> findCustomsWithPlacesByIds(@Param("customIds") List<Long> customIds);


}
