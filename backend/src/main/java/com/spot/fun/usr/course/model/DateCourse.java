package com.spot.fun.usr.course.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Builder
@Entity
@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor
public class DateCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;            // 코스 이름
    private String location;        // 위치
    private String description;     // 설명
    private String ageGroup;        // 나이 그룹
    private boolean fixed;          // 고정된 코스 여부
    private double latitude;        // 위도
    private double longitude;       // 경도

    @Builder.Default
    @OneToMany
    @JsonManagedReference
    private List<DatePlaces> places = new ArrayList<>();

}


//@Entity
//@Getter
//@Setter
//@Builder
//@NoArgsConstructor // 기본 생성자 자동 생성
//@AllArgsConstructor // 모든 필드를 포함하는 생성자 자동 생성
//public class DateCourse {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String name;            // 코스 이름
//    private String location;        // 위치
//    private String description;     // 설명
//    private String ageGroup;           // 나이 그룹 (예: 20대, 30대 등)
//    private boolean fixed;          // 고정된 코스 여부 (변경 가능 여부)
//
//    @ElementCollection // placeIds를 리스트로 저장
//    @CollectionTable(name = "course_place_ids", joinColumns = @JoinColumn(name = "course_id"))
//    @Column(name = "place_id")
//    private List<Long> placeIds;
//
//
//// 기본 생성자, Lombok이 자동으로 추가됨
//
//    //    }
//    // 기본 생성자, Lombok이 자동으로 추가됨
//    @Getter
//    @OneToMany(cascade = CascadeType.ALL)
//    private List<DatePlaces> places;
//}