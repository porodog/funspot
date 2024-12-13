import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useBasic } from "../../../common/context/BasicContext"; // 로그인 정보 가져오기

const CreateBoard = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { userInfo } = useBasic(); // 로그인 정보에서 닉네임 가져오기
    const navigate = useNavigate(); // 리다이렉트를 위한 훅

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userInfo) {
            alert("로그인이 필요합니다.");
            return;
        }

        const token = localStorage.getItem("authToken"); // 로컬 스토리지에서 JWT 토큰 가져오기

        // 작성 데이터
        const postData = {
            title,
            content,
            nickname: userInfo.nickname, // 로그인된 사용자의 닉네임 추가
        };

        try {
            await axios.post("http://localhost:8080/api/boards", postData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // 성공 시 게시판 리스트 화면으로 이동 및 새로고침
            navigate("/board");
        } catch (error) {
            console.error("게시글 작성 실패:", error);
            alert("게시글 작성에 실패했습니다.");
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-md">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">게시글 작성</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <p className="text-sm text-gray-500">작성자: {userInfo?.nickname}</p>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        placeholder="내용"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                        rows="6"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                >
                    작성하기
                </button>
            </form>
        </div>
    );
};

export default CreateBoard;
