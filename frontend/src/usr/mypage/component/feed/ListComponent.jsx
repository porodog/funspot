import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getFeedListApi } from "../../api/MypageApi";
import DetailModal from "../../../feed/modal/DetailModal";
import {
  deleteFeedApi,
  feedLikeApi,
  getFeedDetailApi,
} from "../../../feed/api/FeedApi";
import ModifyModal from "../../../feed/modal/ModifyModal";
import ImageComponent from "./ImageComponent";
import { BiMessageAltDots } from "react-icons/bi";

const ListComponent = () => {
  const { handleFeedCountEvent } = useOutletContext();
  const { userIdx } = useParams();

  // 피드목록
  const [feedList, setFeedList] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [lastId, setLastId] = useState(0);
  const [loading, setLoading] = useState(false);
  const getFeedList = () => {
    if (!hasNext || loading) {
      return;
    }
    setLoading(true);

    getFeedListApi({ userIdx, lastId: lastId, pageSize: 12 })
      .then((data) => {
        const { feedDTOS, feedCount, hasNext } = data;
        setFeedList((prevList) => [...prevList, ...feedDTOS]);

        feedCountRef.current = feedCount;
        handleFeedCountEvent(feedCount);

        setHasNext(hasNext);
        if (feedDTOS.length > 0) {
          setLastId(parseInt(feedDTOS[feedDTOS.length - 1].idx));
        }
      })
      .catch((err) => {
        window.alert("[피드목록] 조회를 실패했습니다");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 피드개수
  const feedCountRef = useRef(0);

  // 피드정보
  const [selectedFeed, setSelectedFeed] = useState({});
  const handleSelectedFeed = (idx) => {
    const feed = feedList.find((item) => item.idx === parseInt(idx));
    setSelectedFeed(feed);
  };

  // 피드상세
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const openDetailModal = (idx) => {
    handleSelectedFeed(idx);
    setIsDetailModalOpen(true);
  };
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedFeed({});
  };

  // 피드수정
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const openModifyModal = (idx) => {
    handleSelectedFeed(idx);
    setIsModifyModalOpen(true);
  };
  const closeModifyModal = (idx) => {
    setIsModifyModalOpen(false);
    setSelectedFeed({});
    idx && handleResearchEvent(idx, "update"); // 목록 재조회
  };

  // 피드 삭제
  const handleListDeleteEvent = (idx) => {
    const confirm = window.confirm("[피드삭제] 삭제하시겠습니까?");
    if (!confirm) {
      return;
    }

    deleteFeedApi({ idx: idx })
      .then((data) => {
        if (data) {
          setFeedList((prevlist) =>
            prevlist.filter((feed) => feed.idx !== data.idx)
          );

          feedCountRef.current = feedCountRef.current - 1;
          handleFeedCountEvent(feedCountRef.current);

          window.alert("[피드삭제] 삭제를 성공했습니다");
        }
      })
      .catch((err) => {
        window.alert("[피드삭제] 삭제를 실패했습니다");
        console.log(err);
      });
  };

  // 데이터 재조회
  const handleResearchEvent = (idx, type) => {
    getFeedDetailApi(idx)
      .then((data) => {
        setFeedList((prevList) => {
          return prevList.map((item) => {
            return item.idx === idx ? { ...item, ...data } : { ...item };
          });
        });
      })
      .catch((err) => {
        window.alert("[피드목록] 조회를 실패했습니다");
        console.log(err);
      });
  };

  // 좋아요
  const handleLikesEvent = (targetIdx, likedYn, likeCount) => {
    feedLikeApi({ idx: targetIdx, likedYn })
      .then((data) => {
        if (data) {
          const newLikeCount = likeCount > 99 ? "99+" : likeCount;
          setFeedList((prevFeedList) =>
            prevFeedList.map((feed) =>
              feed.idx === targetIdx
                ? { ...feed, likedYn: likedYn, likeCount: newLikeCount }
                : feed
            )
          );
          setSelectedFeed((prevFeed) => ({
            ...prevFeed,
            likedYn: likedYn,
            likeCount: newLikeCount,
          }));
        }
      })
      .catch((err) => {
        window.alert("[좋아요] 변경을 실패했습니다");
        console.log(err);
      });
  };

  // 댓글수정
  const handleCommentCountEvent = (comment, type) => {
    if (type !== "new") {
      return;
    }

    setFeedList((prevFeedList) =>
      prevFeedList.map((feed) => {
        if (feed.idx === comment.feedIdx) {
          const commentCount =
            type === "new" ? feed.commentCount + 1 : feed.commentCount - 1;
          const newCommentCount = commentCount > 99 ? "99+" : commentCount;

          setSelectedFeed((prevFeed) => ({
            ...prevFeed,
            commentCount: newCommentCount,
          }));

          return { ...feed, commentCount: newCommentCount };
        }
        return feed;
      })
    );
  };

  // 스크롤 위치
  const [isBottom, setIsBottom] = useState(false);
  const handleScrollEvent = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const innerHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + innerHeight >= scrollHeight - 1) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    getFeedList();
    window.addEventListener("scroll", handleScrollEvent);
    // window.addEventListener("resize", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
      // window.removeEventListener("resize", handleScrollEvent);
    };
  }, []);

  useEffect(() => {
    if (isBottom && hasNext) {
      getFeedList();
    }
  }, [isBottom]);

  return (
    <>
      {/* 게시물 카드 */}
      {(feedList ?? []).length > 0 ? (
        <div className="w-full grid grid-cols-3 gap-3 mx-auto">
          {feedList.map((feed) => (
            <ImageComponent
              key={feed.idx}
              feed={feed}
              openDetailModal={openDetailModal}
              openModifyModal={openModifyModal}
              handleListDeleteEvent={handleListDeleteEvent}
            />
          ))}
        </div>
      ) : (
        <div
          className="w-full h-full 
          my-10 py-10
        flex flex-col justify-center items-center 
        text-gray-600 space-y-4 "
        >
          <BiMessageAltDots className="text-4xl" />
          <span className="font-semibold text-xl">등록된 정보가 없습니다</span>
        </div>
      )}

      {(selectedFeed.idx ?? null) && isDetailModalOpen && (
        <DetailModal
          feed={selectedFeed}
          closeDetailModal={closeDetailModal}
          handleLikesEvent={handleLikesEvent}
          handleCommentCountEvent={handleCommentCountEvent}
        />
      )}
      {(selectedFeed.idx ?? null) && isModifyModalOpen && (
        <ModifyModal feed={selectedFeed} closeModifyModal={closeModifyModal} />
      )}
    </>
  );
};

export default ListComponent;
