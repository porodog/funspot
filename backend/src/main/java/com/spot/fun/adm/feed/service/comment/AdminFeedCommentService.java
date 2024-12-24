package com.spot.fun.adm.feed.service.comment;

import com.spot.fun.adm.feed.dto.comment.AdminFeedCommentRequestDTO;
import com.spot.fun.adm.feed.dto.comment.AdminFeedCommentResponseDTO;

public interface AdminFeedCommentService {

  AdminFeedCommentResponseDTO delete(AdminFeedCommentRequestDTO adminFeedCommentRequestDTO);
}
