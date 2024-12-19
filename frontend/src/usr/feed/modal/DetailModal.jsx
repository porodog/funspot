import { useEffect, useState, useCallback, useRef } from "react";
import {
  deleteCommentApi,
  getFeedCommentListApi,
  postCommentApi,
  postReplyApi,
  putCommentApi,
} from "../api/FeedApi";
import ImageComponent from "../component/item/ImageComponent";
import ProfileComponent from "../component/item/ProfileComponent";
import ContentComponent from "../component/item/ContentComponent";
import ButtonComponent from "../component/item/ButtonComponent";
import CommentListComponent from "../component/comment/CommentListComponent";
import InputComponent from "../component/comment/InputComponent";
import { useBasic } from "../../../common/context/BasicContext";

const DetailModal = ({
  feed,
  closeDetailModal,
  handleLikesEvent,
  handleCommentCountEvent,
  handleReplyActiveEvent,
}) => {
  const { userInfo } = useBasic();
  const loginUserIdx = userInfo?.userIdx || "";

  // 댓글목록 조회
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    if (feed) {
      getFeedCommentListApi(feed.idx)
        .then((data) => {
          setCommentList(data);
        })
        .catch((err) => {
          window.alert("[댓글목록] 조회를 실패했습니다");
          console.log(err);
        });
    }
  }, []);

  // 댓글 등록
  const commentsEndRef = useRef(null);
  const [newComment, setNewComment] = useState(false);
  const handleCommentEvent = useCallback(
    (content) => {
      const confirm = window.confirm("[댓글등록] 등록 하시겠습니까?");
      if (!confirm) {
        return;
      }

      const param = {
        feedIdx: feed.idx,
        content,
      };

      postCommentApi(param)
        .then((data) => {
          if (data) {
            window.alert("[댓글등록] 등록을 성공했습니다");
            setCommentList((prevCommentList) => [...prevCommentList, data]);
            handleCommentCountEvent({ ...data, feedIdx: feed.idx }, "new");
            setNewComment(true);
          }
        })
        .catch((err) => {
          window.alert("[댓글등록] 등록을 실패했습니다");
          console.log(err);
        });
    },
    [feed.idx]
  );

  useEffect(() => {
    if (newComment && commentsEndRef.current) {
      setNewComment(false);
      // commentsEndRef.current.scrollIntoView();
      commentsEndRef.current.scrollTop = commentsEndRef.current.scrollHeight;
    }
  }, [commentList]);

  // 댓글 수정
  const handleCommentModifyEvent = (param) => {
    const confirm = window.confirm("[댓글수정] 저장 하시겠습니까?");
    if (!confirm) {
      return;
    }

    putCommentApi(param)
      .then((data) => {
        if (data) {
          window.alert("[댓글수정] 저장을 성공했습니다");
          setCommentList((prevList) => {
            return prevList.map((item) => {
              if (item.idx === data.idx) {
                return { ...item, content: data.content };
              }
              return { ...item };
            });
          });
          handleCommentCountEvent({ ...data, feedIdx: feed.idx }, "update");
        }
      })
      .catch((err) => {
        window.alert("[댓글수정] 저장을 실패했습니다");
        console.log(err);
      });
  };

  // 댓글 삭제
  const handleCommentDeleteEvent = (idx) => {
    const confirm = window.confirm("[댓글삭제] 삭제 하시겠습니까?");
    if (!confirm) {
      return;
    }

    deleteCommentApi({ idx: idx })
      .then((data) => {
        console.log(data);
        if (data) {
          window.alert("[댓글삭제] 삭제를 성공했습니다");
          setCommentList((prevList) =>
            prevList.map((item) => {
              if (item.idx === data.idx) {
                console.log(item);
                return { ...item, content: "삭제된 댓글입니다", delYn: true };
              }
              return item;
            })
          );
          handleCommentCountEvent({ ...data, feedIdx: feed.idx }, "delete");
        }
      })
      .catch((err) => {
        window.alert("[댓글삭제] 삭제를 실패했습니다");
        console.log(err);
      });
  };

  // 답글 등록
  const handleReplyEvent = useCallback(
    (obj) => {
      const confirm = window.confirm("[답글등록] 등록 하시겠습니까?");
      if (!confirm) {
        return;
      }

      postReplyApi({ ...obj, feedIdx: feed.idx })
        .then((data) => {
          window.alert("[답글등록] 등록을 성공했습니다");
          setCommentList((prevList) =>
            prevList.map((item) => {
              if (item.idx === data.parentIdx) {
                return {
                  ...item,
                  replyList:
                    item.replyList != null ? [...item.replyList, data] : [data],
                };
              }
              return item;
            })
          );
          if (handleReplyActiveEvent) {
            handleReplyActiveEvent({ ...data, feedIdx: feed.idx }, "new");
          }
        })
        .catch((err) => {
          window.alert("[답글등록] 등록을 실패했습니다");
          console.log(err);
        });
    },
    [feed.idx]
  );

  // 답글 수정
  const handleReplyModifyEvent = (obj) => {
    const confirm = window.confirm("[답글수정] 저장 하시겠습니까?");
    if (!confirm) {
      return;
    }

    const param = { ...obj, feedIdx: feed.idx };
    putCommentApi(param)
      .then((data) => {
        if (data) {
          setCommentList((prevList) => {
            window.alert("[답글수정] 저장을 성공했습니다");
            return prevList.map((comment) => {
              if (comment.idx === param.parentIdx) {
                return {
                  ...comment,
                  replyList: comment.replyList.map((reply) => {
                    if (reply.idx === data.idx) {
                      return { ...reply, content: data.content };
                    }
                    return { ...reply };
                  }),
                };
              }
              return { ...comment };
            });
          });
          if (handleReplyActiveEvent) {
            handleReplyActiveEvent({ ...data, feedIdx: feed.idx }, "update");
          }
        }
      })
      .catch((err) => {
        window.alert("[답글수정] 저장을 실패했습니다");
        console.log(err);
      });
  };

  // 답글 삭제
  const handleReplyDeleteEvent = (idx, parentIdx) => {
    const confirm = window.confirm("[답글삭제] 삭제 하시겠습니까?");
    if (!confirm) {
      return;
    }

    deleteCommentApi({ idx: idx })
      .then((data) => {
        if (data) {
          window.alert("[답글삭제] 삭제를 성공했습니다");
          setCommentList((prevList) =>
            prevList.map((comment) => {
              if (comment.idx === parentIdx) {
                return {
                  ...comment,
                  replyList: comment.replyList.map((reply) => {
                    if (reply.idx === idx) {
                      return {
                        ...reply,
                        content: "삭제된 답글입니다",
                        delYn: true,
                      };
                    }
                    return { ...reply };
                  }),
                };
              }
              return { ...comment };
            })
          );
          if (handleReplyActiveEvent) {
            handleReplyActiveEvent({ ...data, feedIdx: feed.idx }, "delete");
          }
        }
      })
      .catch((err) => {
        window.alert("[답글삭제] 삭제를 실패했습니다");
        console.log(err);
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex bg-white rounded-lg w-9/12 h-5/6 p-6 space-x-3">
        <div className="w-3/5 h-auto relative">
          {/* 왼쪽 영역 */}
          {/* 이미지 */}
          <ImageComponent feedImages={feed.feedImages} />
        </div>

        <div className="w-2/5 h-full flex flex-col justify-center space-y-2">
          {/* 오른쪽 영역 */}
          <div className="flex justify-between items-start">
            {/* 프로필 */}
            {feed.user && (
              <ProfileComponent feedUserInfo={feed.user} pageType={"detail"} />
            )}

            {/* 상단 툴바 X 버튼 */}
            <button
              onClick={closeDetailModal}
              className="text-gray-500 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 컨텐츠 + 해시태그 */}
          <ContentComponent feed={feed} />

          {/* 버튼 + 등록일시 */}
          <ButtonComponent feed={feed} handleLikesEvent={handleLikesEvent} />

          <div
            ref={commentsEndRef}
            className="border-2 border-gray-200 overflow-y-auto p-4 space-y-4 h-full rounded-lg"
          >
            {/* 댓글 목록 + 등록인풋 */}
            <CommentListComponent
              commentList={commentList}
              handleReplyEvent={handleReplyEvent}
              handleCommentModifyEvent={handleCommentModifyEvent}
              handleCommentDeleteEvent={handleCommentDeleteEvent}
              handleReplyModifyEvent={handleReplyModifyEvent}
              handleReplyDeleteEvent={handleReplyDeleteEvent}
            />
          </div>

          <div className="flex justify-center w-full">
            {/*댓글 입력 + 등록*/}
            {loginUserIdx && (
              <InputComponent handleCommentEvent={handleCommentEvent} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
