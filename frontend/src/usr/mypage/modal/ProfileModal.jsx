import { useEffect, useRef, useState } from "react";
import {
  API_BASE_URL,
  getNicknameDuplicateApi,
  putProfileApi,
} from "../api/MypageApi";
import ImageComponent from "../component/profile/ImageComponent";
import NicknameComponent from "../component/profile/NicknameComponent";
import DescriptionComponent from "../component/profile/DescriptionComponent";

const initSrc = `${API_BASE_URL}/api/usr/feed/image/no_image.jpg`;

const ProfileModal = ({ mypageInfo, closeProfileModal }) => {
  const { userIdx, description, uploadName, user } = mypageInfo;

  //이미지
  const useFileRef = useRef(null);
  const [showDeleteButton, setShowDeleteButton] = useState(false); // X 버튼 표시 여부
  const [imageSrc, setImageSrc] = useState(initSrc);
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image")) {
      setImageSrc(URL.createObjectURL(file));
      setShowDeleteButton(true);
    } else {
      setImageSrc(initSrc);
      e.target.value = "";
      setShowDeleteButton(false);
    }
  };
  const handleDeleteImage = () => {
    setImageSrc(initSrc);
    setShowDeleteButton(false);
    useFileRef.current.value = "";
  };

  //닉네임
  const [duplicate, setDuplicate] = useState(true);
  const useNicknameRef = useRef(null);
  const useOriginNicknameRef = useRef(user.nickname);
  const handleNicknameChangeEvent = () => {
    if (duplicate) {
      setDuplicate(false);
    }
  };
  const handleNicknameDuplicateEvent = async (nickname) => {
    const originNickname = useOriginNicknameRef.current;

    if (originNickname === nickname) {
      console.log("[중복확인] 이전닉네임과 동일합니다");
      setDuplicate(true);
      return;
    }

    if (!nickname.match(/^[a-zA-Z0-9가-힣]{4,12}$/)) {
      console.log("[중복확인] 한글,영문,숫자만 입력해주세요");
      setDuplicate(false);
      return;
    }

    try {
      const data = await getNicknameDuplicateApi({ nickname });
      if (data.duplicate) {
        console.log("[중복확인] 사용가능합니다");
        setDuplicate(true);
      } else {
        console.log("[중복확인] 사용할 수 없습니다");
        setDuplicate(false);
      }
    } catch (err) {
      console.log("[중복확인] 조회를 실패했습니다");
      console.log(err);
    }
  };

  //소개글
  const useDescriptionRef = useRef(null);

  //수정등록
  const handleProfileSubmitEvent = async () => {
    if (!duplicate) {
      console.log("[등록] 닉네임 중복확인을 해주세요");
      return;
    }

    const form = new FormData();
    const imageFile = useFileRef.current.files[0];
    if (imageFile) {
      form.append("imageFile", imageFile);
    }
    form.append("imageDelete", showDeleteButton);

    form.append("userIdx", userIdx);
    form.append("nickname", useNicknameRef.current.value);
    form.append("description", useDescriptionRef.current.value);

    try {
      const data = await putProfileApi(form);
      if (data) {
        console.log("[프로필] 수정을 완료했습니다");
        window.location.reload();
      }
    } catch (err) {
      console.log("[프로필] 수정을 실패했습니다");
      console.log(err);
    }
  };

  useEffect(() => {
    if (uploadName) {
      setImageSrc(`${API_BASE_URL}/api/usr/profile/image/${uploadName}`);
      setShowDeleteButton(true);
    }
  }, [uploadName]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-w-4xl p-6 relative">
        {/* 상단 툴바 X 버튼 */}
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={() => closeProfileModal()}
            className="text-gray-500 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 flex justify-center w-full h-60 items-center space-x-6">
          {/* 프로필 이미지 */}
          <ImageComponent
            imageSrc={imageSrc}
            useFileRef={useFileRef}
            showDeleteButton={showDeleteButton}
            handleDeleteImage={handleDeleteImage}
            handleImageChange={handleImageChange}
          />

          <div className="w-2/3 h-full space-y-4">
            {/* 닉네임 */}
            <NicknameComponent
              useNicknameRef={useNicknameRef}
              useOriginNicknameRef={useOriginNicknameRef}
              handleNicknameDuplicateEvent={handleNicknameDuplicateEvent}
              handleNicknameChangeEvent={handleNicknameChangeEvent}
            />
            {/* 소개글 */}
            <DescriptionComponent
              useDescriptionRef={useDescriptionRef}
              userDescription={description}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end pr-6">
          <button
            type="button"
            onClick={handleProfileSubmitEvent}
            className="bg-custom-cyan rounded-3xl mt-2 mb-4 ml-2 p-2 w-56 hover:bg-emerald-400"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
