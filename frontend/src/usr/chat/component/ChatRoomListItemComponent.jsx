import React, { useEffect, useState } from "react";
// import {chatroomListApi} from "../api/chatroomApi";
// import ChatOtherProfileComponent from "./ChatOtherProfileComponent";
//

const ChatRoomListItemComponent = ({otherIdx, otherNickname, recentMessage, isRecentMessageRead, handleRoomClick}) => {
    return(
        <div onClick={handleRoomClick}>
            <div>otherIdx : {otherIdx}</div>
            <div>otherNickname : {otherNickname}</div>
            <div>recentMessage : {recentMessage}</div>
            {/*isRecentMessageRead가 자꾸만 undefined 가 댐... 왜이러냐*/}
            <div>isRecentMessageRead : {isRecentMessageRead}</div>
        </div>
    )
}
export default ChatRoomListItemComponent;


// // 초기화
// const initState = {
//     // 빈 배열로 초기화
//     chatRoomListResponseDTOs: [],
// };
//
// const ChatRoomListItemComponent = () => {
//     const [chatRoomListResponseDTOs, setChatRoomListResponseDTOs] = useState(initState);
//
//     // 컴포넌트가 마운트될 때 한 번만 실행됨 > []라서
//     useEffect(() => {
//         chatroomListApi()
//             .then((data) => {
//                 console.log(data);
//                 setChatRoomListResponseDTOs(data);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }, []);
//     return(
//         <>
//             {chatRoomListResponseDTOs.map((chatRoomListResponseDTO) => (
//                 <div key={chatRoomListResponseDTO.roomId}>
//                     <ChatOtherProfileComponent />
//                     <div id="chatroom-text-container">
//                         <p>{chatRoomListResponseDTO.otherNickname}</p>
//                         <p>최근 대화 : {chatRoomListResponseDTO.recentMessage}</p>
//                     </div>
//                     {chatRoomListResponseDTO.isRecentMessageRead ? <></> : <img alt="unCheckedSign"/> }
//                 </div>
//             ))}
//         </>
//     )
// }
//
// export default ChatRoomListItemComponent;