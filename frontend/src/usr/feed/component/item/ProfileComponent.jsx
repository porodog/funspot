import { useCallback } from "react";
import { useBasic } from "../../../../common/context/BasicContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/FeedApi";
import { FaRegEdit, FaUser } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const ProfileComponent = ({
  feedUserInfo,
  pageType,
  handleListDeleteEvent,
  openModifyModal,
}) => {
  const navigate = useNavigate();
  const { userIdx, uploadName, user } = feedUserInfo;

  const { userInfo } = useBasic();
  const loginUserIdx = userInfo?.userIdx || "";

  const handleProfileEvent = useCallback(() => {
    if (loginUserIdx !== "") {
      navigate(`/mypage/feed/${userIdx}`);
    }
  }, [userIdx, loginUserIdx]);

  return (
    <>
      <div className="flex items-center justify-between">
        {/* 프로필 정보 왼쪽 */}
        <div
          className={`
            ${loginUserIdx !== "" ? "cursor-pointer" : ""}
            flex items-center space-x-2
            `}
          onClick={handleProfileEvent}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-400 flex items-center justify-center">
            {uploadName ? (
              <img
                src={`${API_BASE_URL}/api/usr/profile/image/s_${uploadName}`}
                alt="프로필 이미지"
                className="w-full h-full object-contain rounded-full"
              />
            ) : (
              <FaUser className="text-3xl object-contain mx-auto" />
            )}
          </div>
          <div>
            <p className="font-semibold text-base">{user?.nickname}</p>
          </div>
        </div>

        {/* 수정, 삭제 버튼 오른쪽 */}
        <div className="flex items-center space-x-10">
          {pageType === "list" && loginUserIdx === userIdx && (
            <>
              <FaRegEdit
                onClick={openModifyModal}
                className="cursor-pointer hover:text-emerald-500"
                size="1.6rem"
              />
              <RiDeleteBin6Line
                onClick={handleListDeleteEvent}
                className="cursor-pointer hover:text-emerald-500"
                size="1.6rem"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
