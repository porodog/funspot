import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BoardList = () => {
    const [boards, setBoards] = useState([]); // 게시글 데이터
    const [page, setPage] = useState(0); // 현재 페이지
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
    const [searchType, setSearchType] = useState("titleContent"); // 검색 유형
    const [keyword, setKeyword] = useState(""); // 검색 키워드
    const [searchQuery, setSearchQuery] = useState({ type: "titleContent", keyword: "" }); // 실제 검색 쿼리
    const pageSize = 5; // 페이지당 게시글 수
    const buttonsPerGroup = 10; // 한 번에 보여줄 페이지 버튼 수

    useEffect(() => {
        fetchBoards(page, searchQuery.type, searchQuery.keyword); // 페이지 또는 검색 쿼리가 변경될 때 게시글 불러오기
    }, [page, searchQuery]);

    const fetchBoards = async (page, type, keyword) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.get("http://localhost:8080/api/boards/search", {
                params: { page, size: pageSize, type, keyword },
                headers: { Authorization: `Bearer ${token}` },
            });
            setBoards(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("게시글을 불러오는 중 문제가 발생했습니다:", error);
        }
    };

    const handleSearch = () => {
        setSearchQuery({ type: searchType, keyword }); // 검색 버튼 클릭 시 쿼리 업데이트
        setPage(0); // 검색 시 페이지를 0으로 초기화
    };

    const handleReset = () => {
        setSearchType("titleContent");
        setKeyword("");
        setSearchQuery({ type: "titleContent", keyword: "" });
        setPage(0); // 초기 상태로 설정
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    const truncateText = (text, limit) => {
        if (text.length > limit) {
            return text.substring(0, limit) + "...";
        }
        return text;
    };

    const stripHtmlTags = (html) => {
        // HTML 태그를 제거하고 텍스트만 반환
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return new Date(dateString).toLocaleDateString("ko-KR", options);
    };

    // 현재 페이지 그룹 계산
    const currentGroup = Math.floor(page / buttonsPerGroup);
    const groupStart = currentGroup * buttonsPerGroup;
    const groupEnd = Math.min(groupStart + buttonsPerGroup, totalPages);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">게시판 목록</h1>

            {/* 검색 영역 */}
            <div className="mb-4 flex items-center gap-2">
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    <option value="titleContent">제목+내용</option>
                    <option value="title">제목</option>
                    <option value="content">내용</option>
                    <option value="nickname">작성자</option>
                </select>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="검색어를 입력하세요"
                    className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-400 flex-1"
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    style={{ backgroundColor: "#25E2B6" }}
                >
                    검색
                </button>
                <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                >
                    초기화
                </button>
            </div>

            {/* 게시글 목록 */}
            <ul>
                {boards.map((board) => (
                    <Link to={`/board/detail/${board.idx}`} key={board.idx}>
                        <li
                            className="mb-4 p-4 border rounded-md shadow-sm transition duration-300"
                            style={{ borderColor: "#25E2B6" }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "rgba(37, 226, 182, 0.2)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                            }}
                        >
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>{board.nickname}</span>
                                <span>{formatDate(board.regDate)}</span>
                            </div>
                            <h2 className="text-lg font-semibold mt-2">
                                {truncateText(board.title, 40)} {/* 제목 40자 제한 */}
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                                {truncateText(stripHtmlTags(board.content), 60)} {/* HTML 제거 후 내용 60자 제한 */}
                            </p>
                            <div className="text-xs text-gray-400">조회수: {board.viewCount}</div>
                        </li>
                    </Link>
                ))}
            </ul>

            {/* 페이지 네비게이션 */}
            <div className="flex justify-center items-center mt-4 gap-2">
                <button
                    onClick={() => handlePageChange(0)}
                    disabled={page === 0}
                    className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                >
                    &lt;&lt;
                </button>
                <button
                    onClick={() => handlePageChange(groupStart - 1)}
                    disabled={currentGroup === 0}
                    className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                >
                    &lt;
                </button>
                {Array.from({ length: groupEnd - groupStart }, (_, idx) => groupStart + idx).map(
                    (pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-4 py-2 rounded-md ${
                                pageNum === page
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-300 hover:bg-gray-400"
                            }`}
                        >
                            {pageNum + 1}
                        </button>
                    )
                )}
                <button
                    onClick={() => handlePageChange(groupEnd)}
                    disabled={groupEnd >= totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                >
                    &gt;
                </button>
                <button
                    onClick={() => handlePageChange(totalPages - 1)}
                    disabled={page + 1 >= totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                >
                    &gt;&gt;
                </button>
            </div>
        </div>
    );
};

export default BoardList;
