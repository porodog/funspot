package com.spot.fun.usr.custom.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomDTO {
    private Long cno;
    private String title;
    private String description;
    private Long idx;
    private String nickname;
    private List<PlaceDTO> places;
    private List<String> tags;

    @Builder.Default
    private String delYn = "N";

    private Boolean hasNext;

    @Builder.Default
    private boolean wishList = false;
    
}
