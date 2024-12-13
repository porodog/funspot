import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BoardList = () => {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        axios
            .get("http://localhost:8080/api/boards", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setBoards(response.data);
            })
            .catch((error) => {
                console.error("게시글을 불러오는 중 문제가 발생했습니다:", error);
            });
    }, []); // 컴포넌트 마운트 시 실행

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">게시판 목록</h1>
            <ul>
                {boards.map((board) => (
                    <li key={board.idx} className="mb-4 p-4 border rounded-md shadow-sm">
                        <h2 className="text-lg font-semibold">{board.title}</h2>
                        <p className="text-sm text-gray-600">{board.content}</p>
                        <p className="text-sm text-gray-500">
                            작성자: {board.nickname}
                        </p>
                        <Link to={`/board/detail/${board.idx}`} className="text-blue-500">
                            상세보기
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BoardList;
