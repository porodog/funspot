package com.spot.fun.usr.course.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.spot.fun.usr.course.dto.DatePlacesDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


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


    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DatePlaces> places = new ArrayList<>();
}




