import {FaRegHeart} from "react-icons/fa";
import {FaHeart} from "react-icons/fa";
import {BiMessageRoundedDots} from "react-icons/bi";

const ButtonComponent = ({handleSelectedFeed, feed, isLogin}) => {
    const {idx, commentCount, likeCount, likedYn, regDateStr} = feed;

    return (
        <>
            <div className="flex mt-1 py-2 justify-between">
                {/* 좋아요 + 댓글 */}
                <div className="flex justify-start pl-3 space-x-3 w-2/3">
                    <div className="flex items-center">
                        <button
                            className="flex items-center rounded-full p-1 justify-center border border-transparent hover:bg-red-100 focus:outline-none transition-all duration-200"
                            onClick={() => {
                                if (isLogin) {
                                    console.log("로그인상태니까 좋아요 이벤트처리");
                                }
                            }}
                        >
                            {likedYn ? <FaHeart size="1.8rem"/> : <FaRegHeart size="1.8rem"/>}
                        </button>
                        <span>{likeCount > 99 ? "99+" : likeCount}</span>
                    </div>
                    <div className="flex items-center">
                        <button
                            className={`flex items-center rounded-full p-1 justify-center border border-transparent 
                            ${handleSelectedFeed ? "hover:bg-red-100 focus:outline-none transition-all duration-200" : ""}`}
                            onClick={() => handleSelectedFeed && handleSelectedFeed(idx)}
                        >
                            <BiMessageRoundedDots size="1.8rem"/>
                        </button>
                        <span>{commentCount > 99 ? "99+" : commentCount}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pr-3">
                    {/* 등록일시 */}
                    {regDateStr}
                </div>
            </div>
        </>
    );
};

export default ButtonComponent;