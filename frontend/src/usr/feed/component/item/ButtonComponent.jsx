import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { BiMessageRoundedDots } from "react-icons/bi";
import { useBasic } from "../../../../common/context/BasicContext";

const ButtonComponent = ({ feed, openDetailModal, handleLikesEvent }) => {
  const { userInfo } = useBasic();
  const loginUserIdx = userInfo?.userIdx || "";
  const { idx, commentCount, likeCount, likedYn, regDateStr } = feed;

  // 좋아요 토클 이벤트
  const toggleLikes = () => {
    const newLikedYn = !likedYn;
    const newLikeCount = newLikedYn ? likeCount + 1 : likeCount - 1;
    handleLikesEvent(idx, newLikedYn, newLikeCount);
  };

  return (
    <>
      <div className="flex justify-between">
        {/* 좋아요 + 댓글 */}
        <div className="flex justify-start space-x-10 w-2/3">
          <div className="flex items-center space-x-1">
            <button
              className={`flex items-center rounded-full p-1 justify-center border border-transparent 
                ${loginUserIdx ? "hover:text-emerald-500" : ""}
                `}
              onClick={toggleLikes}
            >
              {likedYn ? (
                <FaHeart size="1.8rem" className="text-emerald-500" />
              ) : (
                <FaRegHeart size="1.8rem" />
              )}
            </button>
            <span className="font-semibold">
              {likeCount > 99 ? "99+" : likeCount}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              className={`flex items-center rounded-full p-1 justify-center border border-transparent 
                            ${openDetailModal ? "hover:text-emerald-500" : ""}`}
              onClick={openDetailModal}
            >
              <BiMessageRoundedDots size="1.8rem" />
            </button>
            <span className="font-semibold">
              {commentCount > 99 ? "99+" : commentCount}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* 등록일시 */}
          <span className="font-semibold text-gray-500">{regDateStr}</span>
        </div>
      </div>
    </>
  );
};

export default ButtonComponent;
