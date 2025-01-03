package com.spot.fun.usr.user.service.profile;

import com.spot.fun.file.FileUploadUtil;
import com.spot.fun.usr.user.dto.profile.UserProfileDTO;
import com.spot.fun.usr.user.dto.profile.UserProfileRequestDTO;
import com.spot.fun.usr.user.dto.profile.UserProfileResponseDTO;
import com.spot.fun.usr.user.entity.User;
import com.spot.fun.usr.user.entity.profile.UserProfile;
import com.spot.fun.usr.user.repository.UserRepository;
import com.spot.fun.usr.user.repository.profile.UserProfileRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.lang.reflect.Constructor;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

  private final UserProfileRepository userProfileRepository;
  private final UserRepository userRepository;

  private final FileUploadUtil fileUploadUtil;

  @Override
  public UserProfileResponseDTO getProfile(UserProfileRequestDTO userProfileRequestDTO) {
    Long userIdx = userProfileRequestDTO.getUserIdx();
    UserProfile profile = findByUserIdx(userIdx);
    if (Objects.isNull(profile.getUserIdx())) {
      profile.changeUserIdx(profile.getUser().getIdx());
    }
    return profile.toDTO();
  }

  @Override
  public UserProfileResponseDTO getDuplicate(UserProfileRequestDTO userProfileRequestDTO) {
    String nickname = userProfileRequestDTO.getNickname();
    boolean result = userRepository.existsByNickname(nickname);
    return UserProfileResponseDTO.builder()
            .duplicate(!result)
            .build();
  }

  @Transactional
  @Override
  public UserProfileResponseDTO putProfile(UserProfileRequestDTO userProfileRequestDTO) {
    Long userIdx = userProfileRequestDTO.getUserIdx();

    // 이전데이터 조회
    UserProfile profile = findByUserIdx(userIdx);

    // 닉네임 처리
    User user = profile.getUser();
    String originNickname = profile.getUser().getNickname();
    String newNickname = userProfileRequestDTO.getNickname();
    if (!originNickname.equals(newNickname)) {
      user.updateNickname(newNickname);
      user = userRepository.save(user);
      profile.changeUser(user);
    }

    // 프로필 처리
    boolean imageDelete = userProfileRequestDTO.getImageDelete();
    MultipartFile newImageFile = userProfileRequestDTO.getImageFile();
    if (!imageDelete && !StringUtils.isBlank(profile.getUploadName())) {
      deleteFile(profile);
    }
    if (!Objects.isNull(newImageFile)) { // 신규파일 등록
      deleteFile(profile);
      UserProfileDTO image = uploadFile(newImageFile);
      profile.changeFile(image.getUploadName(), image.getOriginName());
    }
    profile.changeDescription(userProfileRequestDTO.getDescription());
    profile = userProfileRepository.save(profile);

    return profile.toDTO();
  }

  public UserProfileResponseDTO getProfileByNickname(String nickname) {
    User user = userRepository.findByNickname(nickname);
    if (user == null) {
      throw new EntityNotFoundException("User not found with nickname: " + nickname);
    }

    Optional<UserProfile> userProfileOptional = userProfileRepository.findByUserIdx(user.getIdx());
    if (userProfileOptional.isEmpty()) {
      throw new EntityNotFoundException("Profile not found for user: " + nickname);
    }

    UserProfile userProfile = userProfileOptional.get();
    return UserProfileResponseDTO.builder()
            .userIdx(userProfile.getUser().getIdx())
            .uploadName(userProfile.getUploadName())
            .originName(userProfile.getOriginName())
            .description(userProfile.getDescription())
            .build();
  }


  private UserProfile findByUserIdx(Long userIdx) {
    UserProfile profile = userProfileRepository.findByUserIdx(userIdx)
            .orElseGet(() -> {
              try {
                Constructor<UserProfile> constructor = UserProfile.class.getDeclaredConstructor();
                constructor.setAccessible(true);
                return constructor.newInstance();
              } catch (Exception e) {
                throw new RuntimeException("UserProfile 객체 생성 실패", e);
              }
            });
    if (Objects.isNull(profile.getUser())) {
      User user = userRepository.findByIdx(userIdx)
              .orElseThrow(IllegalArgumentException::new);
      profile.changeUser(user);
      //profile.changeUserIdx(user.getIdx());
    }
    return profile;
  }

  private UserProfileDTO uploadFile(MultipartFile multipartFile) {
    if (!Objects.isNull(multipartFile)) {
      String menuName = "profile"; // 메뉴명 << 폴더구분
      List<Map<String, Object>> savedFiles = fileUploadUtil.saveFiles(List.of(multipartFile), menuName);

      if (Objects.isNull(savedFiles)) {
        throw new RuntimeException("파일 업로드 중 오류가 발생했습니다.");
      }

      Map<String, Object> fileMap = savedFiles.get(0);
      return UserProfileDTO.builder()
              .uploadName(String.valueOf(fileMap.get("uploadName")))
              .originName(String.valueOf(fileMap.get("originName")))
              .build();
    }
    return null;
  }

  private void deleteFile(UserProfile profile) {
    String menuName = "profile";
    String uploadName = profile.getUploadName();

    // 업로드파일 삭제로직 필요 >> 테이블 데이터 null 처리만...
    profile.changeFile(null, null);
  }
}
