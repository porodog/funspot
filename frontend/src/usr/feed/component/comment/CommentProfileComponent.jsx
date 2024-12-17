import { useState } from "react";
import { useBasic } from "../../../../common/context/BasicContext";
import InputComponent from "./InputComponent";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/FeedApi";
import { FaRegEdit, FaUser } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const CommentProfileComponent = ({
  comment,
  handleReplyClick,
  handleCommentModifyEvent,
  handleCommentDeleteEvent,
}) => {
  const navigate = useNavigate();
  const { userInfo } = useBasic();
  const loginUserIdx = userInfo?.userIdx || "";

  const [activeComment, setActiveComment] = useState(null);
  const handleCommentModifyClick = (commentId) => {
    setActiveComment((prev) => (prev === commentId ? null : commentId));
  };

  const handleCommentEvent = (content) => {
    handleCommentModifyEvent({
      idx: comment.idx,
      content,
    });
    setActiveComment(null);
  };

  const handleProfileEvent = (userIdx) => {
    if (loginUserIdx !== "") {
      navigate(`/mypage/feed/${userIdx}`);
    }
  };

  return (
    <div className="flex space-x-3">
      <div
        className={`
        ${loginUserIdx !== "" ? "cursor-pointer" : ""}
        w-10 h-9 rounded-full overflow-hidden border border-emerald-400 
        flex items-center justify-center`}
        onClick={() => handleProfileEvent(comment.user.userIdx)}
      >
        {comment.user.uploadName ? (
          <img
            src={`${API_BASE_URL}/api/usr/profile/image/${comment.user.uploadName}`}
            alt="프로필 이미지"
            className="w-full h-full object-contain rounded-full"
          />
        ) : (
          <FaUser className="text-lg object-contain mx-auto" />
        )}
      </div>

      <div className="flex flex-col w-full space-y-1">
        <div className="flex justify-between items-center">
          <p
            className={`
              ${loginUserIdx !== "" ? "cursor-pointer" : ""}
              font-semibold text-gray-800 text-sm`}
            onClick={() => handleProfileEvent(comment.user.userIdx)}
          >
            {comment.user.user.nickname}
          </p>
          <div className="flex items-center space-x-4">
            {!comment.delYn && comment.user.userIdx === loginUserIdx && (
              <>
                <FaRegEdit
                  onClick={() => handleCommentModifyClick(comment.idx)}
                  className="cursor-pointer hover:text-emerald-500"
                  size="1.2rem"
                />
                <RiDeleteBin6Line
                  onClick={() => handleCommentDeleteEvent(comment.idx)}
                  className="cursor-pointer hover:text-emerald-500"
                  size="1.2rem"
                />
              </>
            )}
          </div>
        </div>

        {/* 수정 모드일 경우, 인풋과 버튼을 보여줌 */}
        {activeComment && activeComment === comment.idx ? (
          <div>
            <InputComponent
              handleCommentEvent={handleCommentEvent}
              content={comment.content}
            />
          </div>
        ) : (
          <p className="text-sm text-gray-800 font-medium">{comment.content}</p>
        )}

        <div
          className={`mt-1 flex text-xs text-gray-500 
          ${loginUserIdx ? "justify-between" : "justify-end"}`}
        >
          {/* 좌측: 답글 달기 버튼 */}
          {loginUserIdx && (
            <button
              className="font-semibold text-emerald-400 hover:text-emerald-500"
              onClick={() => handleReplyClick(comment.idx)}
            >
              답글달기
            </button>
          )}

          {/* 우측: 등록일 */}
          <span className="font-semibold text-gray-500">
            {comment.regDateStr}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentProfileComponent;
