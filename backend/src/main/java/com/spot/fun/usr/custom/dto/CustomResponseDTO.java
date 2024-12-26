package com.spot.fun.usr.custom.dto;

import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomResponseDTO {
   private List<CustomDTO> list;
   private Boolean hasNext;
}
