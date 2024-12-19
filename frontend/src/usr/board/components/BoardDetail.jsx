import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useBasic } from "../../../common/context/BasicContext"; // 로그인 정보 가져오기
import "./BoardDetail.css"; // CSS 파일 추가

const BoardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [hasLiked, setHasLiked] = useState(false); // 추천 여부 확인
    const { userInfo } = useBasic(); // 로그인된 사용자 정보 가져오기

    // 게시글 가져오기
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/boards/${id}`)
            .then((response) => {
                setBoard(response.data);
            })
            .catch((error) => {
                console.error("Error fetching board:", error);
            });
    }, [id]);

    // 게시글 추천 관리
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("authToken");

                // 게시글 데이터 가져오기
                const boardResponse = await axios.get(`http://localhost:8080/api/boards/${id}`);
                setBoard(boardResponse.data);

                // 추천 여부 확인
                if (userInfo?.userIdx) {
                    const likeResponse = await axios.get(
                        `http://localhost:8080/api/boards/${id}/has-liked`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                            params: { userIdx: userInfo.userIdx }, // userIdx 전달
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
                const token = localStorage.getItem("authToken");

                // 게시글 데이터 가져오기
                const boardResponse = await axios.get(`http://localhost:8080/api/boards/${id}`);
                setBoard(boardResponse.data);

                // 조회수 증가 요청
                if (userInfo?.userIdx) {
                    await axios.get(`http://localhost:8080/api/boards/${id}/view`, {
                        headers: { Authorization: `Bearer ${token}` },
                        params: { userIdx: userInfo.userIdx },
                    });
                }
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

    const handleEdit = () => {
        navigate(`/board/edit/${id}`); // 수정 화면으로 이동
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("정말로 이 게시글을 삭제하시겠습니까?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("authToken");

        try {
            await axios.patch(
                `http://localhost:8080/api/boards/${id}/delete`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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

        const token = localStorage.getItem("authToken");
        try {
            await axios.post(
                `http://localhost:8080/api/boards/${id}/like`,
                null,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { userIdx: userInfo.userIdx }, // userIdx 전달
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

    return (
        <div
            className="container mx-auto p-4 border rounded-md shadow-sm bg-white"
            style={{borderColor: "#25E2B6"}}
        >
            {/* 제목 */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{board.title}</h1>

            {/* 작성일 */}
            <p className="text-sm text-gray-500 mb-1">
                작성일: {formatDateTime(board.regDate)}
            </p>

            {/* 닉네임 */}
            <p className="text-sm text-gray-600 mb-4">작성자: {board.nickname}</p>

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
            <div className="flex justify-between mb-6">
                <button
                    onClick={handleLike}
                    disabled={hasLiked} // 추천 완료 시 비활성화
                    className={`px-4 py-2 rounded-md transition ${
                        hasLiked
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                >
                    {hasLiked ? "추천 완료" : "추천"} ({board.likeCount || 0})
                </button>
            </div>


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

            {/* 목록으로 버튼 */}
            <div className="text-center">
                <button
                    onClick={() => navigate("/board")}
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                    style={{backgroundColor: "#25E2B6"}}
                >
                    목록으로
                </button>
            </div>
        </div>
    );
};

export default BoardDetail;
