package com.spot.fun.usr.course.dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DateCourseDTO {
    private Long id;
    private String name;
    private String location;
    private String description;
    private boolean fixed;
    private Double latitude;
    private Double longitude;
    private String ageGroup;
    private List<DatePlacesDTO> places; // 장소 DTO 리스트


    public DateCourseDTO(Long id, String name, String description, String ageGroup, boolean fixed, String location, List<DatePlacesDTO> placesDTO) {
        this.id = id;
        this.location = location;
        this.fixed = fixed;
        this.name = name;
        this.ageGroup = ageGroup;
        this.description = description;
        this.places = placesDTO;
    }


    public boolean isFixed() {
        return places != null && !places.isEmpty();
    }
}

