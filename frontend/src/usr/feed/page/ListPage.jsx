import { useEffect, useState } from "react";
import {
  deleteFeedApi,
  feedLikeApi,
  getFeedDetailApi,
  getFeedListApi,
} from "../api/FeedApi";
import ListComponent from "../component/ListComponent";
import InsertModal from "../modal/InsertModal";
import DetailModal from "../modal/DetailModal";
import { useBasic } from "../../../common/context/BasicContext";
import ModifyModal from "../modal/ModifyModal";
import { FiPlusSquare } from "react-icons/fi";

const ListPage = () => {
  const { userInfo } = useBasic();

  // 모달
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState({});
  const closeInsertModal = (idx) => {
    setIsInsertModalOpen(false);
    idx && handleResearchEvent(idx, "new"); // 목록 재조회
  };
  const openDetailModal = (idx) => {
    handleSelectedFeed(idx);
    setIsDetailModalOpen(true);
  };
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedFeed({});
  };
  const openModifyModal = (idx) => {
    handleSelectedFeed(idx);
    setIsModifyModalOpen(true);
  };
  const closeModifyModal = (idx) => {
    setIsModifyModalOpen(false);
    setSelectedFeed({});
    idx && handleResearchEvent(idx, "update"); // 목록 재조회
  };
  const handleSelectedFeed = (idx) => {
    const feed = feedList.find((item) => item.idx === idx);
    setSelectedFeed(feed);
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

  // 목록 조회
  const [feedList, setFeedList] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [lastId, setLastId] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleListEvent = () => {
    if (!hasNext || loading) {
      return;
    }
    setLoading(true);
    getFeedListApi({ lastId: lastId, pageSize: 6 })
      .then((data) => {
        const { feedDTOS, hasNext } = data;
        setFeedList((prevList) => [...prevList, ...feedDTOS]);
        setHasNext(hasNext);
        if (feedDTOS.length > 0) {
          setLastId(parseInt(feedDTOS[feedDTOS.length - 1].idx));
        }
      })
      .catch((error) => {
        window.alert("[피드목록] 조회를 실패했습니다");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
          window.alert("[피드삭제] 삭제를 성공했습니다");
          setFeedList((prevlist) =>
            prevlist.filter((feed) => feed.idx !== data.idx)
          );
        }
      })
      .catch((err) => {
        window.alert("[피드삭제] 삭제를 실패했습니다");
        console.log(err);
      });
  };

  // 재조회
  const handleResearchEvent = (idx, type) => {
    getFeedDetailApi(idx)
      .then((data) => {
        setFeedList((prevList) => {
          if (type === "new") {
            // 신규등록
            return [data, ...prevList];
          } else {
            // 수정등록
            return prevList.map((item) => {
              return item.idx === idx ? { ...item, ...data } : { ...item };
            });
          }
        });
      })
      .catch((err) => {
        window.alert("[피드조회] 조회를 실패했습니다");
        console.log(err);
      });
  };

  // 좋아요
  const handleLikesEvent = (targetIdx, likedYn, likeCount) => {
    feedLikeApi({ idx: targetIdx, likedYn })
      .then((data) => {
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
      })
      .catch((err) => {
        window.alert("[좋아요] 변경을 실패했습니다");
        console.log(err);
      });
  };

  // 댓글 수
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

  // 최초 마운트
  useEffect(() => {
    handleListEvent();
    window.addEventListener("scroll", handleScrollEvent);
    // window.addEventListener("resize", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
      // window.removeEventListener("resize", handleScrollEvent);
    };
  }, []);

  // 모달상태에서 스크롤 비활성화
  // useEffect(() => {
  //   if (isInsertModalOpen || isDetailModalOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [isInsertModalOpen, isDetailModalOpen]);

  // 목록 조회
  useEffect(() => {
    if (isBottom && hasNext) {
      handleListEvent();
    }
  }, [isBottom]);

  return (
    <div className="w-full h-auto">
      <div className="flex justify-end sticky top-0 z-10 bg-white bg-opacity-0">
        {userInfo != null && (
          <button
            type="button"
            className="flex justify-center align-middle items-center 
            w-1/6 py-3 mr-2 my-2
            bg-emerald-400 rounded-3xl 
            text-white text-sm font-mono font-semibold
            hover:bg-emerald-500"
            onClick={() => {
              setIsInsertModalOpen(true);
            }}
          >
            <FiPlusSquare size="1.4rem" className="mr-2" />
            만들기
          </button>
        )}
      </div>
      <ListComponent
        feedList={feedList}
        openDetailModal={openDetailModal}
        handleLikesEvent={handleLikesEvent}
        handleListDeleteEvent={handleListDeleteEvent}
        openModifyModal={openModifyModal}
      />
      {isInsertModalOpen && <InsertModal closeInsertModal={closeInsertModal} />}
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
    </div>
  );
};

export default ListPage;
