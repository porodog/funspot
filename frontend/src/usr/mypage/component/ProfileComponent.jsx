import { API_BASE_URL } from "../api/MypageApi";

const initSrc = `${API_BASE_URL}/api/usr/feed/image/no_image.jpg`;

const ProfileComponent = ({ feedCount, followCount, mypageInfo }) => {
  const { uploadName, description, user } = mypageInfo;

  return (
    <div className="w-full flex items-center space-x-8 py-4 px-6">
      {/* 프로필 이미지 */}
      <div className="w-1/3 h-full rounded-full overflow-hidden">
        <img
          src={
            uploadName
              ? `${API_BASE_URL}/api/usr/profile/image/s_${uploadName}`
              : initSrc
          }
          alt="프로필 이미지"
          className="w-full h-full object-contain rounded-full"
        />
      </div>

      <div className="w-2/3 flex flex-col justify-center">
        {/* 닉네임 */}
        <div className="text-xl font-semibold">{user?.nickname}</div>
        {/*  */}
        <div className="mt-2 flex space-x-6">
          <div className="text-center">
            <div className="font-semibold">{feedCount}</div>
            <div className="text-sm text-gray-500">피드</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{followCount.followerCount}</div>
            <div className="text-sm text-gray-500">팔로워</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{followCount.followingCount}</div>
            <div className="text-sm text-gray-500">팔로잉</div>
          </div>
        </div>
        {/* 상태글 */}
        <div className="mt-2 break-words">{description}</div>
      </div>
    </div>
  );
};

export default ProfileComponent;
