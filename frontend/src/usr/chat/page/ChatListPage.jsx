// pages/ChatListPage.jsx

import React, { useEffect, useState } from 'react';
import { useBasic } from "../../../common/context/BasicContext";
import BasicLayout from "../../../common/layout/BasicLayout";
import ChatRoomListComponent from "../component/ChatRoomListComponent";
import { chatApi } from "../api/chatApi";
import { useNavigate } from 'react-router-dom';

const ChatListPage = () => {
    // 객체 { nickname: "유나티비", userIdx: 1 }
    const { userInfo } = useBasic();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [chatRoomListResponseDTOList, setChatRoomListResponseDTO] = useState([]);


    useEffect(() => {
        const fetchChatRoomListResponseDTOList = async () => {
            try{
                const response = await chatApi.getChatRoomList();
                // 최근 메시지 시간순으로 정렬
                const sortedList = response.sort((a, b) => {
                    const timeA = new Date(a.recentMessageTimestamp);
                    const timeB = new Date(b.recentMessageTimestamp);
                    return timeB - timeA; // 내림차순 정렬 (최신순)
                });
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
            )}
        </div>
    );
};

export default ChatListPage;