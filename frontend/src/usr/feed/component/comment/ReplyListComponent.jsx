import { useState } from "react";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import InputComponent from "./InputComponent";
import { useBasic } from "../../../../common/context/BasicContext";
import { API_BASE_URL } from "../../api/FeedApi";
import { useNavigate } from "react-router-dom";
import { FaRegEdit, FaUser } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const ReplyListComponent = ({
  parentIdx,
  replyList,
  handleReplyModifyEvent,
  handleReplyDeleteEvent,
}) => {
  const navigate = useNavigate();
  const { userInfo } = useBasic();
  const loginUserIdx = userInfo?.userIdx || "";

  const [activeComment, setActiveComment] = useState(null);
  const handleCommentClick = (commentId) => {
    setActiveComment((prev) => (prev === commentId ? null : commentId));
  };
  const handleCommentEvent = (content) => {
    handleReplyModifyEvent({
      idx: activeComment,
      parentIdx,
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
    <>
      {/* 대댓글 (reply) */}
      <div className="pl-1 space-y-2">
        {replyList.map((reply) => (
          <div key={reply.idx} className="flex space-x-2">
            <MdSubdirectoryArrowRight
              className="text-gray-500 mt-1"
              size="1.6rem"
            />
            <div
              className={`
              ${loginUserIdx !== "" ? "cursor-pointer" : ""}
              w-10 h-8 rounded-full overflow-hidden border border-emerald-400 
              flex items-center justify-center`}
              onClick={() => handleProfileEvent(reply.user.userIdx)}
            >
              {reply.user.uploadName ? (
                <img
                  src={`${API_BASE_URL}/api/usr/profile/image/${reply.user.uploadName}`}
                  alt="프로필 이미지"
                  className="w-full h-full object-contain rounded-full"
                />
              ) : (
                <FaUser className="text-base object-contain mx-auto" />
              )}
            </div>

            <div className="flex flex-col w-full space-y-1">
              <div className="flex justify-between items-center">
                <p
                  className={`
                    ${loginUserIdx !== "" ? "cursor-pointer" : ""}
                    font-semibold text-gray-800 text-sm`}
                  onClick={() => handleProfileEvent(reply.user.userIdx)}
                >
                  {reply.user.user.nickname}
                </p>
                <div className="flex items-center space-x-2">
                  {!reply.delYn && reply.user.userIdx === loginUserIdx && (
                    <>
                      <FaRegEdit
                        onClick={() => handleCommentClick(reply.idx)}
                        className="cursor-pointer hover:text-emerald-500"
                        size="1.2rem"
                      />
                      <RiDeleteBin6Line
                        onClick={() =>
                          handleReplyDeleteEvent(reply.idx, parentIdx)
                        }
                        className="cursor-pointer hover:text-emerald-500"
                        size="1.2rem"
                      />
                    </>
                  )}
                </div>
              </div>

              {activeComment && activeComment === reply.idx ? (
                <div>
                  <InputComponent
                    handleCommentEvent={handleCommentEvent}
                    content={reply.content}
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-800 font-medium">
                  {reply.content}
                </p>
              )}
              <div className="mt-1 flex justify-end text-xs font-semibold text-gray-500">
                <span>{reply.regDateStr}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReplyListComponent;
