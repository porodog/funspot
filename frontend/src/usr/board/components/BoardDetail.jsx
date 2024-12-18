import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useBasic } from "../../../common/context/BasicContext"; // 로그인 정보 가져오기
import "./BoardDetail.css"; // CSS 파일 추가

const BoardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const { userInfo } = useBasic(); // 로그인된 사용자 정보 가져오기

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

            {/* 수정일 (null이 아닌 경우만 노출) */}
            {board.modDate && (
                <p className="text-sm text-gray-500 mb-4">
                    수정일: {formatDateTime(board.modDate)}
                </p>
            )}

            {/* 내용 */}
            <div
                className="board-content text-gray-700 leading-relaxed mb-6"
                dangerouslySetInnerHTML={{__html: board.content}} // HTML 렌더링
            />

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
