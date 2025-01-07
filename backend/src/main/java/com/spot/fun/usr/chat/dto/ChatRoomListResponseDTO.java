package com.spot.fun.usr.chat.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// 내 채팅방 목록 조회(1님과의 대화, 2님과의 대화 ... 내가 참여한 대화 방이 리스트로...)
@Builder(toBuilder = true)
@Getter
@Data
@NoArgsConstructor
public class ChatRoomListResponseDTO {
    private Long roomId;
    private Long otherIdx;
    private String otherNickname;
    private String recentMessage;
    //private java.sql.Timestamp recentMessageTimestamp;
    private LocalDateTime localDateTime;
    private boolean isRecentMessageRead;
    private String otherProfileImg;
    private String otherPeedUrl;

    public ChatRoomListResponseDTO(Long roomId, Long otherIdx, String otherNickname, String recentMessage,
                                   //java.sql.Timestamp recentMessageTimestamp,
                                   LocalDateTime localDateTime,
                                   boolean isRecentMessageRead, String otherProfileImg, String otherFeedUrl) {
        this.roomId = roomId;
        this.otherIdx = otherIdx;
        this.otherNickname = otherNickname;
        this.recentMessage = recentMessage;
        //this.recentMessageTimestamp = recentMessageTimestamp;
        this.localDateTime = localDateTime;
        this.isRecentMessageRead = isRecentMessageRead;
        this.otherProfileImg = otherProfileImg;
        this.otherPeedUrl = otherFeedUrl;
    }
}
