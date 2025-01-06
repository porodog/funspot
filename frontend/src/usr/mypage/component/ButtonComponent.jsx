import { useParams } from "react-router-dom";
import { useBasic } from "../../../common/context/BasicContext";
import { useNavigate } from 'react-router-dom';
import { chatApi } from '../../chat/api/chatApi';
import {useEffect, useState} from "react";

const ButtonComponent = ({
  openProfileModal,
  handleFollowClickEvent,
  followStatus,
}) => {
  const { userIdx } = useParams();
  const { userInfo } = useBasic();
  const loginUserIdx = userInfo?.userIdx || "";
  const navigate = useNavigate();

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const chatRooms = await chatApi.getChatRoomList();
        const unreadCount = chatRooms.reduce((count, room) => {
          return count + (room.isRecentMessageRead ? 0 : 1);
        }, 0);
        setUnreadCount(unreadCount);
      } catch (error) {
        console.error('Failed to fetch unread messages:', error);
      }
    };

    fetchUnreadMessages();
  }, []);

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
              <button
                  className="py-3 px-6 border-2 border-emerald-400 bg-emerald-400 text-white rounded-full
              text-base font-semibold hover:bg-emerald-500"
                  onClick={()=>navigate(`/chat/`)}
              >
                내 채팅방
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
                )}
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
              onClick={()=>navigate(`/chat/${userIdx}`)}
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
