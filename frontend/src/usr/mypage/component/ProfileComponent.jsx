import { FaUser } from "react-icons/fa";
import { API_BASE_URL } from "../api/MypageApi";

const ProfileComponent = ({ feedCount, followCount, mypageInfo }) => {
  const { uploadName, description, user } = mypageInfo;

  return (
    <div className="w-full flex items-center space-x-8 p-6">
      {/* 프로필 이미지 */}
      <div
        className="w-32 h-32 rounded-full overflow-hidden
      border-2 border-emerald-400 flex items-center justify-center"
      >
        {uploadName ? (
          <img
            src={`${API_BASE_URL}/api/usr/profile/image/s_${uploadName}`}
            alt="프로필 이미지"
            className="w-full h-full object-contain rounded-full"
          />
        ) : (
          <FaUser className="text-8xl object-contain mx-auto" />
        )}
      </div>

      <div className="w-2/3 flex flex-col justify-center space-y-3">
        {/* 닉네임 */}
        <div className="text-xl font-semibold text-gray-600">
          {user?.nickname}
        </div>
        {/*  */}
        <div className="flex space-x-8 text-gray-600">
          <div className="text-center">
            <div className="font-semibold">{feedCount}</div>
            <div className="text-base text-gray-600">피드</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{followCount.followerCount}</div>
            <div className="text-base text-gray-600">팔로워</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{followCount.followingCount}</div>
            <div className="text-base text-gray-600">팔로잉</div>
          </div>
        </div>
        {/* 상태글 */}
        <div className="break-words text-gray-600">{description}</div>
      </div>
    </div>
  );
};

export default ProfileComponent;
