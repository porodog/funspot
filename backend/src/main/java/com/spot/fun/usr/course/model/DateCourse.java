package com.spot.fun.usr.course.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class DateCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String location;
    private String description;
    private String imageUrl;  // 이미지 URL 저장 필드 추가
    private Integer ageGroup; // 10, 20, 30, 40
    private String difficulty; // 난이도 필드 추가
    private boolean fixed;    // 고정된 코스 여부를 나타내는 필드 추가
    private List<String> options; // 추가 옵션을 저장할 필드
}