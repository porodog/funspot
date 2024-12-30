import BasicLayout from "../../../common/layout/BasicLayout";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import ProfileComponent from "../component/ProfileComponent";
import ButtonComponent from "../component/ButtonComponent";
import { useEffect, useState } from "react";
import MenuTabComponent from "../component/MenuTabComponent";
import { useBasic } from "../../../common/context/BasicContext";
import {
  followStatusApi,
  getFollowCountAllApi,
  getFollowStatusApi,
  getProfileApi,
} from "../api/MypageApi";
import ProfileModal from "../modal/ProfileModal";

const menuList = [
  {
    id: "feed",
    name: "피드",
  },
  {
    id: "like",
    name: "좋아요",
  },
  {
    id: "wish",
    name: "위시리스트",
  },
  {
    id: "comment",
    name: "피드댓글",
  },
];
const initMenu = menuList[0].id;

const initCount = {
  followCount: 0,
  followingCount: 0,
};

const IndexPage = () => {
  const { userIdx } = useParams();
  const { userInfo } = useBasic();
  const loginUserIdx = userInfo?.userIdx || "";
  const { pathname } = useLocation();

  // 탭 메뉴
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(initMenu);
  const handleMenuTabClickEvent = (menuId) => {
    navigate(`/mypage/${menuId}/${userIdx}`);
    setActiveMenu(menuId);
  };

  // 피드 개수
  const [feedCount, setFeedCount] = useState(0);
  const handleFeedCountEvent = (count) => {
    setFeedCount(count);
  };

  // 팔로우
  const [followStatus, setFollowStatus] = useState(false);
  const [followCount, setFollowCount] = useState(initCount);
  const handleFollowClickEvent = async () => {
    const confirm = window.confirm(
      followStatus
        ? "[팔로우] 해제 하시겠습니까?"
        : "[팔로우] 팔로우 하시겠습니까?"
    );
    if (!confirm) {
      return;
    }

    try {
      const status = !followStatus;
      const param = { followerIdx: loginUserIdx, followingIdx: userIdx };
      const data = await followStatusApi(param, status);

      setFollowStatus(data.followStatus);
      setFollowCount((prev) => {
        return {
          ...prev,
          followingCount: data.followStatus
            ? prev.followingCount + 1
            : prev.followingCount - 1,
        };
      });
    } catch (err) {
      window.alert("[팔로우상태] 변경을 실패했습니다");
      console.log(err);
    }
  };

  // 사용자정보
  const [mypageInfo, setMypageInfo] = useState({});
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };
  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  useEffect(() => {
    const setNowMenuTab = () => {
      menuList.map(
        (menu) => pathname.includes(menu.id) && setActiveMenu(menu.id)
      );
    };
    const getFollowCount = async () => {
      try {
        const data = await getFollowCountAllApi({ userIdx });
        const { followerCount, followingCount } = data;
        setFollowCount({ followerCount, followingCount });
      } catch (err) {
        window.alert("[팔로우수] 조회를 실패했습니다");
        console.log(err);
      }
    };
    const getFollowStatus = async () => {
      try {
        const data = await getFollowStatusApi({
          followerIdx: loginUserIdx,
          followingIdx: userIdx,
        });
        setFollowStatus(data.followStatus);
      } catch (err) {
        window.alert("[팔로우상태] 조회를 실패했습니다");
        console.log(err);
      }
    };
    const getMypageUser = async () => {
      try {
        const data = await getProfileApi({ userIdx });
        setMypageInfo(data);
      } catch (err) {
        window.alert("[사용자정보] 조회를 실패했습니다");
        console.log(err);
      }
    };

    if (!isNaN(userIdx)) {
      if (parseInt(userIdx) === parseInt(loginUserIdx)) {
        setNowMenuTab();
      }
      if (parseInt(userIdx) !== parseInt(loginUserIdx)) {
        getFollowStatus();
      }
      getFollowCount();
      getMypageUser();
    }
  }, [userIdx, loginUserIdx, pathname]);

  return (
    <BasicLayout>
      <div className="border border-gray-200 w-full space-y-4">
        {/* 프로필 정보 */}
        <ProfileComponent
          feedCount={feedCount}
          followCount={followCount}
          mypageInfo={mypageInfo}
        />

        {/* 버튼 */}
        <ButtonComponent
          openProfileModal={openProfileModal}
          handleFollowClickEvent={handleFollowClickEvent}
          followStatus={followStatus}
        />

        {/* 메뉴바 */}
        {parseInt(loginUserIdx) === parseInt(userIdx) ? (
          <div
            className="p-4 sticky top-0 mx-1
            border-b-2 border-b-gray-200 
            bg-white
            z-40"
          >
            <div className="flex space-x-2">
              {menuList.map((menu) => (
                <MenuTabComponent
                  key={menu.id}
                  menu={menu}
                  activeMenu={activeMenu}
                  handleMenuTabClickEvent={handleMenuTabClickEvent}
                />
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* 목록 */}
        <Outlet context={{ handleFeedCountEvent }} />

        {mypageInfo?.userIdx && isProfileModalOpen && (
          <ProfileModal
            mypageInfo={mypageInfo}
            closeProfileModal={closeProfileModal}
          />
        )}
      </div>
    </BasicLayout>
  );
};

export default IndexPage;
