package com.spot.fun.usr.user.dto;

import com.spot.fun.usr.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private String userId;
    private String password;
    private UserRole userRole;


    public User toEntity() {
        return User.builder()
                    .userId(this.userId)
                    .password(this.password)
                    .userRole(this.userRole)
                    .build();
    }
}
