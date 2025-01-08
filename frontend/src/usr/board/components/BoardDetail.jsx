import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useBasic} from "../../../common/context/BasicContext"; // 로그인 정보 가져오기
import "./BoardDetail.css"; // CSS 파일 추가
import {FaUser} from "react-icons/fa";

export const API_BASE_URL = process.env.REACT_APP_API_ROOT;

// 프로필 이미지 렌더링 컴포넌트
const ProfileImage = ({ profileImage, size = "w-10 h-10" }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        // 프로필 이미지가 변경될 때 상태 초기화
        if (profileImage?.uploadName) {
            setImageLoaded(false);
            setImageError(false);
        }
    }, [profileImage?.uploadName]);

    return (
        <div
            className={`${size} relative rounded-full overflow-hidden border-2 border-emerald-400 flex items-center justify-center bg-gray-100`}
        >
            {profileImage?.uploadName && !imageError ? (
                <>
                    {!imageLoaded && (
                        <FaUser className="text-gray-400 text-lg absolute" />
                    )}
                    <img
                        src={`${API_BASE_URL}/api/usr/profile/image/${profileImage.uploadName}`}
                        alt="프로필"
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => {
                            setImageError(true);
                        }}
                    />
                </>
            ) : (
                <FaUser className="text-gray-400 text-lg" />
            )}
        </div>
    );
};



const BoardDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [hasLiked, setHasLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyContent, setReplyContent] = useState({});
    const {userInfo} = useBasic();
    const [replyVisibility, setReplyVisibility] = useState({}); // 대댓글 입력창 표시 상태

    const handleReplyToggle = (commentId) => {
        setReplyVisibility((prev) => ({
            ...prev,
            [commentId]: !prev[commentId], // 토글 방식으로 입력창 표시 여부 변경
        }));
    };

    // 게시글 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 게시글과 댓글 데이터 가져오기
                const [boardResponse, commentsResponse] = await Promise.all([
                    axios.get(`/api/boards/${id}`),
                    axios.get(`/api/comments/${id}`)
                ]);

                // 게시글 작성자의 프로필 이미지 가져오기
                const boardProfileResponse = await axios.get(`/api/usr/profile`, {
                    params: {userIdx: boardResponse.data.authorIdx}
                });

                console.log("uploadName:"+ boardProfileResponse.data.uploadName);
                // 게시글 데이터에 프로필 이미지 추가
                const boardWithProfile = await {
                    ...boardResponse.data,
                    profileImage: {
                        uploadName:boardProfileResponse.data.uploadName // uploadName 사용
                    }
                };

                // 댓글과 대댓글에 프로필 이미지 추가
                const commentsWithProfiles = await Promise.all(
                    commentsResponse.data.map(async (comment) => {
                        try {
                            // 댓글 작성자의 프로필 이미지 가져오기
                            const commentProfileResponse = await axios.get(`/api/boards/profile/by-nickname/${comment.author}`);
                            const profileImage = commentProfileResponse.data;

                            // 대댓글 처리
                            let repliesWithProfiles = [];
                            if (comment.replies && comment.replies.length > 0) {
                                repliesWithProfiles = await Promise.all(
                                    comment.replies.map(async (reply) => {
                                        try {
                                            // 대댓글 작성자의 프로필 이미지 가져오기
                                            const replyProfileResponse = await axios.get(`/api/boards/profile/by-nickname/${reply.author}`);
                                            return {
                                                ...reply,
                                                profileImage: replyProfileResponse.data, // 프로필 이미지 추가
                                            };
                                        } catch (error) {
                                            console.error("대댓글 프로필 가져오기 실패:", error);
                                            return reply;
                                        }
                                    })
                                );
                            }

                            return {
                                ...comment,
                                profileImage, // 프로필 이미지 추가
                                replies: repliesWithProfiles,
                            };
                        } catch (error) {
                            console.error("댓글 프로필 가져오기 실패:", error);
                            return comment;
                        }
                    })
                );


                console.log('Board with profile:', boardWithProfile); // 디버깅용
                console.log('Comments with profiles:', commentsWithProfiles); // 디버깅용

                setBoard(boardWithProfile);
                //setComments(commentsWithProfiles);
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
            }
        };

        fetchData();
    }, [id]);


    // 게시글 추천 관리
    useEffect(() => {
        const fetchData = async () => {
            try {

                // 게시글 데이터 가져오기
                const boardResponse = await axios.get(`${API_BASE_URL}/api/boards/${id}`);
                setBoard(boardResponse.data);

                // 추천 여부 확인
                if (userInfo?.userIdx) {
                    const likeResponse = await axios.get(
                        `${API_BASE_URL}/api/boards/${id}/has-liked`,
                        {
                            params: {userIdx: userInfo?.userIdx}, // userIdx 전달
                        }
                    );
                    setHasLiked(likeResponse.data.hasLiked); // 서버에서 반환된 true/false 값 설정
                }
            } catch (error) {
                console.error("Error fetching board or like status:", error);
            }
        };

        fetchData();
    }, [id, userInfo]);

    // 게시글 조회수 관리
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 게시글 데이터 가져오기
                const boardResponse = await axios.get(`${API_BASE_URL}/api/boards/${id}`);
                setBoard(boardResponse.data);

                console.log(userInfo?.userIdx ?? 0);
                // 게시글 작성자의 프로필 이미지 가져오기
                const boardProfileResponse = await axios.get(`/api/usr/profile`, {
                    params: {userIdx: boardResponse.data.authorIdx}
                });

                console.log("uploadName:"+ boardProfileResponse.data.uploadName);
                // 게시글 데이터에 프로필 이미지 추가
                const boardWithProfile = await {
                    ...boardResponse.data,
                    profileImage: {
                        uploadName:boardProfileResponse.data.uploadName // uploadName 사용
                    }
                };
                // 조회수 증가 요청
                setBoard(boardWithProfile);
                await axios.get(`${API_BASE_URL}/api/boards/${id}/view`, {
                    params: {userIdx: userInfo?.userIdx ?? 0},
                });

            } catch (error) {
                console.error("Error fetching board or incrementing view count:", error);
            }
        };

        fetchData();
    }, [id, userInfo]);

    const formatDateTime = (dateString) => {
        if (!dateString) return "정보 없음";
        const date = new Date(dateString);
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Intl.DateTimeFormat("ko-KR", options).format(date);
    };

    // 댓글 가져오기
    useEffect(() => {
        fetchComments();
    }, [id], [newComment]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/comments/${id}`);
            const commentsWithProfiles = await Promise.all(
                response.data.map(async (comment) => {
                    const commentProfileResponse = await axios.get(`/api/boards/profile/by-nickname/${comment.author}`);
                    const profileImage = commentProfileResponse.data;

                    let repliesWithProfiles = [];
                    if (comment.replies && comment.replies.length > 0) {
                        repliesWithProfiles = await Promise.all(
                            comment.replies.map(async (reply) => {
                                const replyProfileResponse = await axios.get(`/api/boards/profile/by-nickname/${reply.author}`);
                                return {
                                    ...reply,
                                    profileImage: replyProfileResponse.data,
                                };
                            })
                        );
                    }

                    return {
                        ...comment,
                        profileImage,
                        replies: repliesWithProfiles,
                    };
                })
            );
            setComments(commentsWithProfiles);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) {
            alert("댓글 내용을 입력해주세요."); // 경고 알림
            return;
        }

        try {
            const payload = {
                content: newComment,
                author: userInfo.nickname, // 사용자 닉네임
            };
            console.log("Sending Payload:", payload);

            const response = await axios.post(
                `${API_BASE_URL}/api/comments/${id}`,
                payload,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("authToken")}`},
                }
            );

            console.log("Response Data:", response.data); // 응답 데이터 확인
            setNewComment("");
            fetchComments(); // 댓글 새로고침
        } catch (error) {
            console.error("Error posting comment:", error.response || error);
        }
    };

    const handleReplySubmit = async (parentCommentId) => {
        const content = replyContent[parentCommentId]?.trim();
        if (!content) {
            alert("대댓글 내용을 입력해주세요."); // 경고 알림
            return;
        }

        try {
            const payload = {
                content,
                author: userInfo.nickname, // 사용자 닉네임
                parentCommentId,
            };

            const response = await axios.post(`/api/comments/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`, // 인증 토큰 추가
                },
            });

            // 작성된 대댓글에 프로필 이미지 추가
            const replyProfileResponse = await axios.get(`/api/boards/profile/by-nickname/${response.data.author}`);
            const newReply = {
                ...response.data,
                profileImage: replyProfileResponse.data,
            };

            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === parentCommentId
                        ? {...comment, replies: [...comment.replies, newReply]}
                        : comment
                )
            );

            setReplyContent((prev) => ({...prev, [parentCommentId]: ""}));
            setReplyVisibility((prev) => ({...prev, [parentCommentId]: false})); // 입력창 숨기기
        } catch (error) {
            console.error("Error posting reply:", error);
        }
    };


    const handleEdit = () => {
        navigate(`/board/edit/${id}`); // 수정 화면으로 이동
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("정말로 이 게시글을 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await axios.patch(
                `${API_BASE_URL}/api/boards/${id}/delete`,
                {},
                {
                    headers: {},
                }
            );
            alert("게시글이 삭제되었습니다.");
            navigate("/board");
        } catch (error) {
            console.error("게시글 삭제 실패:", error.response || error);
            alert("게시글 삭제에 실패했습니다.");
        }
    };

    const handleLike = async () => {
        if (hasLiked) return; // 이미 추천한 경우 실행 방지

        try {
            await axios.post(
                `${API_BASE_URL}/api/boards/${id}/like`,
                null,
                {
                    params: {userIdx: userInfo?.userIdx}, // userIdx 전달
                }
            );

            // 추천 후 상태 업데이트
            setHasLiked(true);
            setBoard((prevBoard) => ({
                ...prevBoard,
                likeCount: (prevBoard.likeCount || 0) + 1, // 추천 수 증가
            }));
        } catch (error) {
            console.error("추천 실패:", error);
        }
    };


    if (!board) {
        return <p>Loading...</p>;
    }

    const handleDeleteComment = async (commentId) => {
        // 확인 창 표시
        const confirmDelete = window.confirm("정말로 이 댓글을 삭제하시겠습니까?");
        if (!confirmDelete) return;

        const isParentComment = comments.some((comment) => comment.id === commentId);
        const targetComment = isParentComment
            ? comments.find((comment) => comment.id === commentId)
            : comments
                .flatMap((comment) => comment.replies)
                .find((reply) => reply.id === commentId);

        if (!targetComment) {
            alert("삭제하려는 댓글을 찾을 수 없습니다.");
            return;
        }

        if (targetComment.author !== userInfo.nickname) {
            alert("댓글 작성자만 삭제할 수 있습니다.");
            return;
        }

        try {
            // 서버에 삭제 요청
            await axios.delete(`${API_BASE_URL}/api/comments/${commentId}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("authToken")}`},
            });

            // 상태 업데이트
            setComments((prevComments) =>
                prevComments
                    .filter((comment) => comment.id !== commentId) // 상위 댓글 제거
                    .map((comment) => ({
                        ...comment,
                        replies: comment.replies.filter((reply) => reply.id !== commentId), // 대댓글 제거
                    }))
            );
        } catch (error) {
            console.error("Failed to delete comment:", error.response || error);
        }
    };

    return (
        <div
            className="container mx-auto p-4 border rounded-md shadow-sm bg-white"
            style={{borderColor: "#25E2B6"}}
        >
            {/* 제목 */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{board.title}</h1>

            {/*/!* 작성일 *!/*/}
            {/*<p className="text-sm text-gray-500 mb-1">*/}
            {/*    작성일: {formatDateTime(board.regDate)}*/}
            {/*</p>*/}

            {/*/!* 닉네임 *!/*/}
            {/*<p className="text-sm text-gray-600 mb-4">작성자: {board.nickname}</p>*/}

            {/* 작성자 정보 영역 */}
            <div className="flex items-center mb-4">
                <Link to={`/mypage/feed/${board.authorIdx}`}>
                    <ProfileImage profileImage={board.profileImage}/>
                </Link>
                <Link to={`/mypage/feed/${board.authorIdx}`}>
                    <span className="ml-2 font-bold text-black hover:text-emerald-500 transition-colors">
                        {board.nickname}
                    </span>
                </Link>
                <span className="ml-4 text-gray-500">
                    {formatDateTime(board.regDate)}
                </span>
            </div>

            {/* 수정일 */}
            {board.modDate && (
                <p className="text-sm text-gray-500 mb-4">
                    수정일: {formatDateTime(board.modDate)}
                </p>
            )}

            {/* 내용 */}
            <div
                className="board-content text-gray-700 leading-relaxed mb-6"
                dangerouslySetInnerHTML={{__html: board.content}}
            />

            {/* 추천 버튼 */}
            {userInfo ? (
                <div className="flex justify-center mb-6">
                    <button
                        onClick={handleLike}
                        disabled={hasLiked}
                        className={`px-4 py-2 rounded-md transition ${
                            hasLiked
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-custom-cyan text-white hover:bg-emerald-600"
                        }`}
                    >
                        {hasLiked ? "추천 완료" : "추천"} ({board.likeCount || 0})
                    </button>
                </div>
            ) : (
                <p className="text-red-500 text-sm mt-4 text-center">
                    로그인 후 추천 기능을 이용하실 수 있습니다.
                </p>
            )}


            {/* 수정/삭제 버튼 */}
            {userInfo?.nickname === board.nickname && (
                <div className="flex justify-end gap-4 mb-6">
                    <button
                        onClick={handleEdit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        수정
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                        삭제
                    </button>
                </div>
            )}

            <div className="comments-section mt-8">
                <h2 className="text-xl font-semibold mb-4">댓글</h2>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={`comment-${comment.id}`} className="mb-4 p-3 border rounded-md">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Link to={`/mypage/feed/${comment.profileImage.userIdx}`}>
                                        <ProfileImage profileImage={comment.profileImage} size="w-8 h-8"/>
                                    </Link>
                                    <span className="text-sm font-semibold ml-2 cursor-pointer">
        <Link to={`/mypage/feed/${comment.profileImage.userIdx}`} className="hover:text-emerald-500 transition-colors">
            {comment.author || "익명"}
        </Link>
    </span>
                                    <span className="text-gray-700 flex-1 ml-2 truncate cursor-pointer" // 여백 추가
                                          onClick={() => handleReplyToggle(comment.id)}>
        {comment.content}
    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-xs text-gray-500 mr-2">
                                        {formatDateTime(comment.createdAt)}
                                    </span>
                                    {userInfo?.nickname === comment.author && (
                                        <button
                                            className="text-red-500 text-sm font-bold"
                                            onClick={() => handleDeleteComment(comment.id)}
                                        >
                                            X
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* 대댓글 목록 */}
                            {comment.replies && comment.replies.map((reply) => (
                                <div key={`reply-${reply.id}`}
                                     className="mt-4 ml-6 p-3 border rounded-md comment-replies">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Link to={`/mypage/feed/${reply.profileImage.userIdx}`}>
                                                <ProfileImage profileImage={reply.profileImage} size="w-6 h-6"/>
                                            </Link>
                                            <span className="text-sm font-semibold ml-2 cursor-pointer">
    <Link to={`/mypage/feed/${reply.profileImage.userIdx}`} className="hover:text-emerald-500 transition-colors">
        {reply.author || "익명"}
    </Link>
</span>


                                            <span className="text-gray-700 ml-2">
                                                {reply.content}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-xs text-gray-500 mr-2">
                                                {formatDateTime(reply.createdAt)}
                                            </span>
                                            {userInfo?.nickname === reply.author && (
                                                <button
                                                    className="text-red-500 text-sm font-bold"
                                                    onClick={() => handleDeleteComment(reply.id)}
                                                >
                                                    X
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* 대댓글 입력창 */}
                            {replyVisibility[comment.id] && userInfo && (
                                <div className="mt-2 ml-6">
                                    <div className="flex items-center justify-end">
                                        <input
                                            type="text"
                                            value={replyContent[comment.id] || ""}
                                            onChange={(e) => {
                                                const input = e.target.value;
                                                setReplyContent((prev) => ({
                                                    ...prev,
                                                    [comment.id]: input.length <= 50 ? input : input.slice(0, 50),
                                                }));
                                            }}
                                            placeholder="대댓글 입력 (최대 50자)"
                                            className="border rounded-md px-3 py-1 flex-grow mr-2"
                                        />
                                        <button
                                            onClick={() => handleReplySubmit(comment.id)}
                                            className="bg-custom-cyan hover:bg-emerald-600 text-white px-4 py-2 rounded-md"
                                        >
                                            대댓글 작성
                                        </button>
                                    </div>
                                </div>

                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
                )}
                {/* 로그인 안내문구 */}
                {!userInfo && (
                    <p className="text-red-500 text-sm mt-4">
                        로그인 후 댓글 작성 기능을 이용하실 수 있습니다.
                    </p>
                )}
                {/* 댓글 입력 필드 및 버튼 */}
                {userInfo && (
                    <div className="new-comment mt-6">

                        <div className="new-comment mt-6">
                            <div className="flex items-center">
                                <input
                                    value={newComment}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        setNewComment(input.length <= 50 ? input : input.slice(0, 50));
                                    }}
                                    placeholder="타인의 권리를 침해하거나 명예를 훼손하는 댓글은 운영원칙 및 관련 법률에 제재를 받을 수 있습니다. (최대 50자)"
                                    className="border rounded-md px-3 py-2 flex-grow"
                                />
                                <button
                                    onClick={handleCommentSubmit}
                                    className="ml-2 bg-custom-cyan text-white hover:bg-emerald-600 px-4 py-2 rounded-md"
                                >
                                    댓글 작성
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </div>
            {/* 목록으로 버튼 */}
            <div className="text-center" style={{marginTop: "2rem"}}> {/* 상단 간격을 2rem으로 설정 */}
                <button
                    onClick={() => navigate("/board")}
                    className="w-full bg-custom-cyan hover:bg-emerald-600 text-white py-2 rounded-md transition"
                >
                    목록으로
                </button>
            </div>
                    </div>
                );
                };

                export default BoardDetail;