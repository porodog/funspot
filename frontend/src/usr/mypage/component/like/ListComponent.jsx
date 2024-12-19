import { useEffect, useState } from "react";
import { getLikeListApi } from "../../api/MypageApi";
import { useParams } from "react-router-dom";
import DetailModal from "../../../feed/modal/DetailModal";
import { feedLikeApi } from "../../../feed/api/FeedApi";
import ImageComponent from "./ImageComponent";
import { BiMessageAltDots } from "react-icons/bi";

const ListComponent = () => {
  const { userIdx } = useParams();

  // 좋아요 목록
  const [likeList, setLikeList] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [lastId, setLastId] = useState(0);
  const [loading, setLoading] = useState(false);
  const getLikeList = () => {
    if (!hasNext || loading) {
      return;
    }
    setLoading(true);

    getLikeListApi({ userIdx, lastId: lastId, pageSize: 12 })
      .then((data) => {
        const { feedDTOS, hasNext } = data;
        setLikeList((prevList) => [...prevList, ...feedDTOS]);

        setHasNext(hasNext);
        if (feedDTOS.length > 0) {
          setLastId(parseInt(feedDTOS[feedDTOS.length - 1].idx));
        }
      })
      .catch((err) => {
        window.alert("[좋아요목록] 조회를 실패했습니다");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 피드정보
  const [selectedFeed, setSelectedFeed] = useState({});
  const handleSelectedFeed = (idx) => {
    const feed = likeList.find((item) => item.idx === parseInt(idx));
    setSelectedFeed({ ...feed, idx: feed.feedIdx });
  };

  // 피드상세
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const openDetailModal = (idx) => {
    handleSelectedFeed(idx);
    setIsDetailModalOpen(true);
  };
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    handleLikeListEvent();
  };

  // 좋아요 상태체크
  const handleLikeListEvent = () => {
    const { feedIdx, likedYn } = selectedFeed;

    if (!likedYn) {
      setLikeList((prevList) =>
        prevList.filter((item) => item.feedIdx !== feedIdx)
      );
    }

    setSelectedFeed({});
  };

  // 좋아요
  const handleLikesEvent = (targetIdx, likedYn, likeCount) => {
    feedLikeApi({ idx: targetIdx, likedYn })
      .then((data) => {
        const newLikeCount = likeCount > 99 ? "99+" : likeCount;
        setLikeList((prevFeedList) =>
          prevFeedList.map((feed) =>
            feed.feedIdx === targetIdx
              ? { ...feed, likedYn: likedYn, likeCount: newLikeCount }
              : feed
          )
        );
        setSelectedFeed((prevFeed) => ({
          ...prevFeed,
          likedYn: likedYn,
          likeCount: newLikeCount,
        }));
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

    setLikeList((prevFeedList) =>
      prevFeedList.map((feed) => {
        console.log(feed, comment.feedIdx);
        if (feed.feedIdx === comment.feedIdx) {
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
    getLikeList();
    window.addEventListener("scroll", handleScrollEvent);
    // window.addEventListener("resize", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
      // window.removeEventListener("resize", handleScrollEvent);
    };
  }, []);

  useEffect(() => {
    if (isBottom && hasNext) {
      getLikeList();
    }
  }, [isBottom]);

  return (
    <>
      {/* 게시물 카드 */}
      {(likeList ?? []).length > 0 ? (
        <div className="w-full grid grid-cols-3 gap-3 mx-auto">
          {likeList.map((feed) => (
            <ImageComponent
              key={feed.idx}
              feed={feed}
              openDetailModal={openDetailModal}
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
    </>
  );
};

export default ListComponent;
