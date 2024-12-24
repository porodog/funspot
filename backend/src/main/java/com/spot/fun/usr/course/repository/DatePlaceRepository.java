package com.spot.fun.usr.course.repository;

import com.spot.fun.usr.course.model.DatePlaces;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DatePlaceRepository extends JpaRepository<DatePlaces, Long> {

  // 장소 ID 리스트로 장소 데이터를 조회
  List<DatePlaces> findAllById(Iterable<Long> ids);
}
