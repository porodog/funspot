package com.spot.fun.usr.chat.controller;

import com.spot.fun.usr.chat.dto.ChatMessageRequestDTO;
import com.spot.fun.usr.chat.dto.ChatMessageResponseDTO;
import com.spot.fun.usr.chat.dto.ChatRoomListResponseDTO;
import com.spot.fun.usr.chat.dto.RoomIdPairDTO;
import com.spot.fun.usr.chat.service.ChatFacadeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatFacadeService chatFacadeService;
    private final SimpMessageSendingOperations messagingTemplate;  // 생성자 주입으로 변경

    @GetMapping("/")    //채팅방 리스트
    public List<ChatRoomListResponseDTO> getChatRoomList() {
        return chatFacadeService.getChatRoomList();
    }

    @GetMapping("/{otherIdx}")
    public Map<String, Object> getChatListOfOtherIdx(@PathVariable("otherIdx") Long otherIdx) {
        // 채팅방 조회 또는 생성 후, 두 개의 roomId 모두 반환
        RoomIdPairDTO roomIds = chatFacadeService.getOrCreateChatRooms(otherIdx);

        return Map.of(
                "userRoomId", roomIds.getUserRoomId(),      // 내 채팅방 ID
                "otherRoomId", roomIds.getOtherRoomId(),    // 상대방 채팅방 ID
                "chatIdChatMessageDTOMap", chatFacadeService.getChatIdChatMessageDTOMap(otherIdx),
                "chatRoomContentDTO", chatFacadeService.getChatRoomContentDTO(otherIdx)
        );
    }

    // Principal을 통해 사용자 정보를 얻도록 수정
    @MessageMapping("msg/{roomId}/{otherRoomId}")
    public void handleChatMessage(@DestinationVariable("roomId") Long roomId,
                                         @DestinationVariable("otherRoomId") Long otherRoomId,
                                         @RequestBody ChatMessageRequestDTO chatMessageRequestDTO,
                                         Principal principal) {
        chatMessageRequestDTO.setUserIdx(principal.getName());

        // 메시지 저장
        ChatMessageResponseDTO chatMessageResponseDTO = chatFacadeService.saveChatMessage(roomId, otherRoomId, chatMessageRequestDTO);

        // 발신자 채널로만 메시지 전송
        messagingTemplate.convertAndSend("/sub/roomId/" + roomId, chatMessageResponseDTO);
    }
    @PostMapping("/{roomId}/read")
    @Transactional
    public ResponseEntity<Void> markMessagesAsRead(@PathVariable("roomId") Long roomId) {
        try {
            chatFacadeService.markMessagesAsRead(roomId);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            log.error("잘못된 요청 파라미터: ", e);
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            log.error("메시지 읽음 처리 중 서버 오류: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
