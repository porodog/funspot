// pages/ChatListPage.jsx

// pages/ChatListPage.jsx
import React, { useEffect, useState } from 'react';
import { useBasic } from "../../../common/context/BasicContext";
import BasicLayout from "../../../common/layout/BasicLayout";
import ChatRoomListComponent from "../component/ChatRoomListComponent";
import { chatApi } from "../api/chatApi";
import { useNavigate } from 'react-router-dom';

// currentUser의 채팅방 목록 조회 페이지

// 1. List<RoomListResponseDTO>는 chatApi /api/chat 요청으로 백엔드에게서 응답받아야댐
//      -> 백엔드 controller로 userIdx를 받으면 굳이 토큰 꺼내쓰는 작업 없어도 될거임(= ChatController 수정 必)
// 2. <ChatRoomListComponent/>에 props로 List<RoomListResponseDTO> 전달
// 3. <ChatRoomListComponent>에서 .map으로 recentMessageTimestamp 순으로 순회
// 3-1. .map으로 {otherNickname, recentMessage, isRecentMessageRead, otherIdx(DTO에 추가해야함)} 추출
// 3-2. 추출한 데이터를 <ChatRoomItemComponent>에 props로 전달
// 4-1. <ChatRoomItemComponent>에서 <div>태그에 데이터 채워서 반환


const ChatListPage = () => {
    // 객체 { nickname: "유나티비", userIdx: 1 }
    const { userInfo } = useBasic();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [chatRoomListResponseDTOList, setChatRoomListResponseDTO] = useState([]);


    useEffect(() => {
        // if(userInfo == null){
        //     console.log("useEffect userInfo: "+ userInfo);
        //     navigate('/login')
        // }
        const fetchChatRoomListResponseDTOList = async () => {
            try{
                const response = await chatApi.getChatRoomList();
                setChatRoomListResponseDTO(response);
                console.log(response);
            }catch(error){
                setError('채팅방 목록을 불러오는데 실패했습니다.');
                console.error('채팅방 목록 조회 실패:', error);
            }
        }
        fetchChatRoomListResponseDTOList();
    }, [])  // 아마 최초 마운트 시에만 동작

    if(error){
        return <BasicLayout>
            {error}
        </BasicLayout>
    }

    const handleRoomClick = (otherIdx) => {
        navigate(`/chat/${otherIdx}`);
    }

    return (
        <div className="container mx-auto max-w-2xl bg-gray-50 h-[735px]">
            {userInfo == null ? (
                // <>비로그인 사용자는 채팅 목록을 열람할 수 없습니다.</>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="p-8 text-center bg-white rounded-lg shadow-md">
                        <p className="text-lg text-gray-700">비로그인 사용자는 채팅 목록을 열람할 수 없습니다.</p>
                    </div>
                </div>
            ) : (
                <div className="p-4">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">채팅 목록</h1>
                    <ChatRoomListComponent
                        chatRoomListResponseDTOList={chatRoomListResponseDTOList}
                        handleRoomClick={handleRoomClick}
                    />
                </div>
                // <>
                //     채팅 목록 티비
                //     <ChatRoomListComponent
                //         chatRoomListResponseDTOList={chatRoomListResponseDTOList}
                //         handleRoomClick={handleRoomClick}
                //     />
                //     <button onClick={()=>navigate(`/chat/3`)}>3번 채팅방 입장</button>
                // </>
            )}
        </div>
    );
};

export default ChatListPage;