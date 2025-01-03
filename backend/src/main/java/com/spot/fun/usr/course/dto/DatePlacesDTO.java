package com.spot.fun.usr.course.dto;

import lombok.*;

import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DatePlacesDTO {
    private Long id;
    private String name;
    private String description;
    private Double latitude;
    private Double longitude;
    private String cost;
    private String time;

    @Size(max = 1024)
    private String image;

}
