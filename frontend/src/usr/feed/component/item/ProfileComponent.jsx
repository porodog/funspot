import { useCallback } from "react";
import { useBasic } from "../../../../common/context/BasicContext";

const ProfileComponent = ({
  user,
  pageType,
  handleListDeleteEvent,
  openModifyModal,
}) => {
  const { idx, nickname } = user;

  const { userInfo } = useBasic();
  const loginUserIdx = userInfo?.userIdx || "";

  const handleProfileEvent = useCallback(() => {
    console.log("profile idx >> " + idx);
  }, [idx]);

  return (
    <>
      <div className="flex items-center justify-between px-3">
        {/* 프로필 정보 왼쪽 */}
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={handleProfileEvent}
        >
          <img src="" alt="프로필 이미지" className="w-12 h-12 rounded-full" />
          <div>
            <p className="font-semibold text-lg">{nickname}</p>
          </div>
        </div>

        {/* 수정, 삭제 버튼 오른쪽 */}
        <div className="space-x-4">
          {pageType === "list" && loginUserIdx === idx && (
            <>
              <button className="text-blue-500" onClick={openModifyModal}>
                수정
              </button>
              <span className="mx-2 text-gray-500">|</span>
              <button className="text-red-500" onClick={handleListDeleteEvent}>
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
