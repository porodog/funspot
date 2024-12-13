import { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import { getFeedCommentListApi } from "../../../api/MypageApi";
import DetailModal from "../../../../feed/modal/DetailModal";
import { feedLikeApi, getFeedDetailApi } from "../../../../feed/api/FeedApi";

const ListComponent = () => {
  // 목록
  const [commentList, setCommentList] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [lastId, setLastId] = useState(0);
  const [loading, setLoading] = useState(false);
  const getFeedCommentList = async () => {
    try {
      setLoading(true);

      const data = await getFeedCommentListApi({
        lastId: lastId,
        pageSize: 12,
      });
      if (data) {
        const { feedCommentList, hasNext } = data;
        setCommentList((prevList) => [...prevList, ...feedCommentList]);
        setHasNext(hasNext);
        if (feedCommentList.length > 0) {
          setLastId(parseInt(feedCommentList[feedCommentList.length - 1].idx));
        }
      }
    } catch (err) {
      console.log("[댓글목록] 조회를 실패했습니다");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 삭제 갱신
  const handleDeleteListEvent = (commentIdx) => {
    setCommentList((prevList) =>
      prevList.filter(
        (item) => item.parentIdx !== commentIdx || item.idx !== commentIdx
      )
    );
  };

  // 피드정보
  const [selectedFeed, setSelectedFeed] = useState({});
  const handleSelectedFeed = async (idx) => {
    try {
      const data = await getFeedDetailApi(idx);
      setSelectedFeed(data);
    } catch (err) {
      setSelectedFeed({});
      console.log("[피드상세] 조회를 실패했습니다");
      console.log(err);
    }
  };

  // 상세 모달
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const openDetailModal = (idx) => {
    setIsDetailModalOpen(true);
    handleSelectedFeed(idx);
  };
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedFeed({});
    //window.location.reload();
  };

  // 좋아요
  const handleLikesEvent = (targetIdx, likedYn, likeCount) => {
    feedLikeApi({ idx: targetIdx, likedYn })
      .then((data) => {
        const newLikeCount = likeCount > 99 ? "99+" : likeCount;
        setSelectedFeed((prevFeed) => ({
          ...prevFeed,
          likedYn: likedYn,
          likeCount: newLikeCount,
        }));
      })
      .catch((err) => {
        console.log("[좋아요] 등록을 실패했습니다");
        console.log(err);
      });
  };

  // 댓글
  const handleCommentCountEvent = (comment, type) => {
    updateCommentList(comment, type);

    if (type !== "update") {
      return;
    }
    const commentCount =
      type === "new"
        ? selectedFeed.commentCount + 1
        : selectedFeed.commentCount - 1;
    const newCommentCount = commentCount > 99 ? "99+" : commentCount;
    setSelectedFeed((prevFeed) => ({
      ...prevFeed,
      commentCount: newCommentCount,
    }));
  };

  // 답글
  const handleReplyActiveEvent = (reply, type) => {
    updateCommentList(reply, type);
  };

  // 댓글,답글 갱신
  const updateCommentList = (item, type) => {
    console.log(item);
    //{idx: 156, content: 'ㅅㅅㅅㅅ', delYn: false
    if (type === "new") {
      setCommentList((prevList) => [
        {
          idx: item.idx,
          content: item.content,
          delYn: false,
          feedIdx: item.feedIdx,
          parentIdx: item.parentIdx,
        },
        ...prevList,
      ]);
    } else if (type === "update") {
      setCommentList((prevList) =>
        prevList.map((prev) => {
          if (prev.idx === item.idx) {
            return { ...prev, content: item.content };
          }
          return { ...prev };
        })
      );
    } else if (type === "delete") {
      handleDeleteListEvent(item.idx);
    }
  };
  console.log(commentList);

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
    getFeedCommentList();
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  useEffect(() => {
    if (isBottom && hasNext && !loading) {
      getFeedCommentList();
    }
  }, [isBottom]);

  return (
    <>
      <div className="max-w-4xl mx-auto mt-8">
        {/* 게시판 타이틀 */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">피드 댓글</h1>
        </div>
        {commentList && (
          <TableComponent
            commentList={commentList}
            handleDeleteListEvent={handleDeleteListEvent}
            openDetailModal={openDetailModal}
          />
        )}
      </div>
      {(selectedFeed.idx ?? null) && isDetailModalOpen && (
        <DetailModal
          feed={selectedFeed}
          closeDetailModal={closeDetailModal}
          handleLikesEvent={handleLikesEvent}
          handleCommentCountEvent={handleCommentCountEvent}
          handleReplyActiveEvent={handleReplyActiveEvent}
        />
      )}
    </>
  );
};

export default ListComponent;
