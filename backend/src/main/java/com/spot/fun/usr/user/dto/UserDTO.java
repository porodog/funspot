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
    private Long idx;              // 사용자 고유 번호
    private String userId;
    private String password;
    private String newPassword;    // 새 비밀번호 (비밀번호 변경 시 사용)
    private String name;           // 이름
    private String birthDate;   // 생년월일
    private String nickname;       // 닉네임
    private String email;           // 이메일
    private String phone;          // 전화번호
    private String zonecode;       // 우편번호
    private String address;        // 주소
    private String detaileAdd;     // 상세 주소
    private String provider;
    private UserRole userRole;
    private String useYn;

    public static UserDTO fromEntity(User user) {
        return UserDTO.builder()
                .idx(user.getIdx())
                .userId(user.getUserId())
                .name(user.getName())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .phone(user.getPhone())
                .zonecode(user.getZonecode())
                .address(user.getAddress())
                .detaileAdd(user.getDetaileAdd())
                .provider(user.getProvider())
                .useYn(user.getUseYn())
                .build();
    }

    public User toEntity() {
        return User.builder()
                    .userId(this.userId)
                    .password(this.password)
                    .userRole(this.userRole)
                    .build();
    }
}
