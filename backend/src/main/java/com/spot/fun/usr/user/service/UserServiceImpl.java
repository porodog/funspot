package com.spot.fun.usr.user.service;

import com.spot.fun.usr.user.dto.UserDTO;
import com.spot.fun.usr.user.dto.UserRole;
import com.spot.fun.usr.user.entity.User;
import com.spot.fun.usr.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bcryptPasswordEncoder;

    @Override
    public UserDTO findByIdx(Long idx) {
        return userRepository.findByIdx(idx)
                .orElseThrow(IllegalArgumentException::new)
                .toDTO();
    }

    @Override
    public UserDTO findByUserId(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 탈퇴된 회원 여부 확인
        if ("N".equals(user.getUseYn())) {
            throw new IllegalStateException("탈퇴된 회원입니다."); // 탈퇴된 회원 예외 처리
        }

        return user.toDTO(); // 활성화된 회원만 반환
    }




    @Override
    public UserDTO findUserProfile(String userId) {
        // 비밀번호를 제외한 사용자 정보 반환
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        return UserDTO.builder()
                .idx(user.getIdx())
                .userId(user.getUserId())
                .name(user.getName())
                .nickname(user.getNickname())
                .birthDate(user.getBirthDate())
                .email(user.getEmail())
                .phone(user.getPhone())
                .zonecode(user.getZonecode())
                .address(user.getAddress())
                .detaileAdd(user.getDetaileAdd())
                .provider(user.getProvider())
                .useYn(user.getUseYn())
                .build();
    }

    @Override
    public void deactivateUser(Long userIdx) {
        User user = userRepository.findByIdx(userIdx)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 회원 비활성화 처리
        user.deactivate("N");
        userRepository.save(user);
    }




    @Override
    public Optional<User> getCurrentUser() {
        // SecurityContext에서 현재 사용자 정보 가져오기
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUserId(userId);
    }


    @Override
    public String findUserIdByDetails(String name, String birthDate, String email) {
        // UserRepository를 통해 사용자 정보 조회
        return userRepository.findByNameAndBirthDateAndEmail(name, birthDate, email)
                .map(User::getUserId) // 찾은 사용자의 아이디를 반환
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보를 찾을 수 없습니다."));
    }

    @Override
    public void updatePassword(String userId, String email, String newPassword) {
        // 사용자 정보 확인
        log.info("비밀번호 변경 요청: userId={}, email={}", userId, email);

        User user = userRepository.findByUserIdAndEmail(userId, email)
                .orElseThrow(() -> {
                    log.error("사용자 정보를 찾을 수 없음: userId={}, email={}", userId, email);
                    return new IllegalArgumentException("사용자 정보를 찾을 수 없습니다.");
                });

        // 비밀번호 암호화 및 설정
        String encodedPassword = bcryptPasswordEncoder.encode(newPassword);
        log.info("암호화된 비밀번호 생성 완료");

        try {
            user.updatePassword(encodedPassword);
            userRepository.save(user);
            log.info("비밀번호 변경 완료: userId={}", userId);
        } catch (Exception e) {
            log.error("비밀번호 변경 중 오류 발생", e);
            throw new RuntimeException("비밀번호 변경 중 문제가 발생했습니다.", e);
        }
    }

    public Optional<User> findUserByIdx(Long idx) {
        return userRepository.findByIdx(idx);
    }

    @Override
    public boolean checkPassword(String userId, String rawPassword) {
        // 비밀번호를 검증하는 로직
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        return bcryptPasswordEncoder.matches(rawPassword, user.getPassword());
    }

    @Override
    public void validateAndUpdateUserProfile(String userId, UserDTO userDTO) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 소셜 회원 처리
        if (!"LOCAL".equals(user.getProvider())) {
            if (userDTO.getPhone() != null) {
                user.updatePhone(userDTO.getPhone());
            }
            if (userDTO.getZonecode() != null && userDTO.getAddress() != null) {
                user.updateAddress(userDTO.getZonecode(), userDTO.getAddress(), userDTO.getDetaileAdd());
            }
            userRepository.save(user);
            return;
        }

        // 유효성 검사
        if (userDTO.getPhone() != null && !userDTO.getPhone().matches("^(01[016789])-?[0-9]{3,4}-?[0-9]{4}$")) {
            throw new IllegalArgumentException("phone:유효한 핸드폰 번호를 입력해주세요.");
        }
        if (userDTO.getNewPassword() != null && !userDTO.getNewPassword().isEmpty() &&
                !userDTO.getNewPassword().matches("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$")) {
            throw new IllegalArgumentException("newPassword:비밀번호를 입력해주세요.");
        }

        // 핸드폰 번호 중복 확인 (기존 번호와 다를 때만)
        if (userDTO.getPhone() != null && !userDTO.getPhone().equals(user.getPhone()) &&
                userRepository.existsByPhone(userDTO.getPhone())) {
            throw new IllegalArgumentException("phone:이미 사용 중인 핸드폰 번호입니다.");
        }

        if (userDTO.getZonecode() == null || userDTO.getZonecode().trim().isEmpty()) {
            throw new IllegalArgumentException("zonecode:우편번호를 입력해주세요");
        }
        if (userDTO.getAddress() == null || userDTO.getAddress().trim().isEmpty()) {
            throw new IllegalArgumentException("address:주소를 입력해주세요");
        }

        // 비밀번호 변경
        if (userDTO.getNewPassword() != null && !userDTO.getNewPassword().isEmpty()) {
            String encodedPassword = bcryptPasswordEncoder.encode(userDTO.getNewPassword());
            user.updatePassword(encodedPassword);
        }

        // 핸드폰 번호 업데이트
        if (userDTO.getPhone() != null) {
            user.updatePhone(userDTO.getPhone());
        }

        // 주소 업데이트
        if (userDTO.getZonecode() != null && userDTO.getAddress() != null) {
            user.updateAddress(userDTO.getZonecode(), userDTO.getAddress(), userDTO.getDetaileAdd());
        }

        userRepository.save(user);
        log.info("회원 정보 수정 완료: userId={}", userId);
    }

@Override
    public void grantAdminRole(Long userId){
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));
    user.changeUserRole(UserRole.ROLE_ADMIN);

    userRepository.save(user); // 권한 변경 후 저장
}
}

