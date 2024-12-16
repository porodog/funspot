import { useParams } from "react-router-dom";
import { useBasic } from "../../../common/context/BasicContext";

const ButtonComponent = ({
  openProfileModal,
  handleFollowClickEvent,
  followStatus,
}) => {
  const { userIdx } = useParams();
  const { userInfo } = useBasic();
  const loginUserIdx = userInfo?.userIdx || "";

  return (
    <>
      <div className="flex space-x-10 w-full items-center justify-center">
        {parseInt(userIdx) === parseInt(loginUserIdx) ? (
          <>
            <button
              className="py-3 px-6 border-2 border-emerald-400 bg-emerald-400 text-white rounded-full 
              text-base font-semibold hover:bg-emerald-500"
              onClick={openProfileModal}
            >
              프로필 편집
            </button>
          </>
        ) : (
          <>
            <button
              className={`
                  ${
                    followStatus
                      ? "border-emerald-400 bg-emerald-400 text-white "
                      : "border-gray-200 bg-white text-gray-600 hover:border-white hover:text-white"
                  }
                  py-3 px-6 rounded-full border-2
                  text-base font-semibold hover:bg-emerald-500`}
              onClick={handleFollowClickEvent}
            >
              {followStatus ? "팔로우 중" : "팔로우"}
            </button>
            <button
              className="border-gray-200 bg-white text-gray-600  
                  py-3 px-6 rounded-full border-2
                  text-base font-semibold hover:bg-emerald-500 hover:border-white hover:text-white"
              onClick={null}
            >
              메시지
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ButtonComponent;
