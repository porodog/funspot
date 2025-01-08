import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_API_ROOT;
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

const BoardList = () => {
    const [boards, setBoards] = useState([]); // 게시글 데이터
    const [userIds, setUserIds] = useState({}); // nickname -> userIdx 매핑
    const [page, setPage] = useState(0); // 현재 페이지
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
    const [searchType, setSearchType] = useState("titleContent"); // 검색 유형
    const [keyword, setKeyword] = useState(""); // 검색 키워드
    const [isSearchMode, setIsSearchMode] = useState(false); // 검색 상태 여부
    const pageSize = 10; // 페이지당 게시글 수
    const buttonsPerGroup = 10; // 한 번에 보여줄 페이지 버튼 수

    useEffect(() => {
        if (!isSearchMode) {
            fetchBoards(page); // 현재 페이지를 전달
        }
    }, [page, isSearchMode]);


    const fetchBoards = async (page) => {
        try {
            const response = await axios.get("/api/boards", {
                params: { page, size: pageSize },
            });

            // 게시글 데이터 가져오기
            const boardsData = response.data.content || [];

            // 각 게시글 작성자의 프로필 정보 가져오기
            const boardsWithProfile = await Promise.all(
                boardsData.map(async (board) => {
                    try {
                        const profileResponse = await axios.get(`/api/usr/profile`, {
                            params: { userIdx: board.authorIdx }
                        });
                        return {
                            ...board,
                            profileImage: profileResponse.data.uploadName
                        };
                    } catch (error) {
                        console.error("프로필 정보 가져오기 실패:", error);
                        return board;
                    }
                })
            );

            setBoards(boardsWithProfile);
            setTotalPages(response.data.totalPages || 0);
        } catch (error) {
            console.error("게시글 불러오기 실패:", error);
        }
    };

    const searchBoards = async (type, keyword, page = 0) => {
        try {
            // 검색 결과 가져오기
            const response = await axios.get("/api/boards/search", {
                params: { type, keyword, page, size: pageSize },
            });

            // 검색된 게시글 데이터
            const searchedBoards = response.data.content || [];

            // 각 게시글 작성자의 프로필 정보 가져오기
            const boardsWithProfile = await Promise.all(
                searchedBoards.map(async (board) => {
                    try {
                        const profileResponse = await axios.get(`/api/usr/profile`, {
                            params: { userIdx: board.authorIdx }
                        });
                        return {
                            ...board,
                            profileImage: profileResponse.data.uploadName
                        };
                    } catch (error) {
                        console.error("프로필 정보 가져오기 실패:", error);
                        return board;
                    }
                })
            );

            setBoards(boardsWithProfile);
            setTotalPages(response.data.totalPages || 0);
            setPage(page); // 현재 페이지 번호 업데이트
            setIsSearchMode(true);
        } catch (error) {
            console.error("검색 중 문제가 발생했습니다:", error);
        }
    };


    const handleSearch = () => {
        if (!keyword.trim()) {
            alert("검색어를 입력해주세요.");
            return;
        }
        searchBoards(searchType, keyword, 0); // 검색 시 첫 페이지부터 시작
    };

    const handleReset = () => {
        setSearchType("titleContent");
        setKeyword("");
        setIsSearchMode(false);
        setPage(0);
        fetchBoards(0);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            if (isSearchMode) {
                // 검색 모드일 때는 searchBoards 호출
                searchBoards(searchType, keyword, newPage);
            } else {
                // 일반 모드일 때는 fetchBoards 호출
                fetchBoards(newPage);
            }
            setPage(newPage); // 페이지 상태 업데이트
        }
    };

    const truncateText = (text, limit) => {
        if (text.length > limit) {
            return text.substring(0, limit) + "...";
        }
        return text;
    };

    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return new Date(dateString).toLocaleDateString("ko-KR", options);
    };

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
                    className="px-4 py-2 bg-custom-cyan text-white rounded-md hover:bg-emerald-600 transition"

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
            {boards.length > 0 ? (
                <ul>
                    {boards.map((board) => (
                        <Link to={`/board/detail/${board.idx}`} key={board.idx}>
                            <li
                                className="mb-4 p-4 border rounded-md shadow-sm transition duration-300"
                                style={{borderColor: "#25E2B6"}}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "rgba(37, 226, 182, 0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                }}
                                >

                                <div className="flex items-center mb-2 gap-0.3"> {/* gap 속성으로 간격 조정 */}
                                    <Link to={`/mypage/feed/${board.authorIdx}`}>
                                        <div
                                            className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400 flex items-center justify-center">
                                            {console.log('프로필 이미지 데이터:', board.profileImage)} {/* 디버깅용 로그 */}
                                            {board.profileImage ? (
                                                <img
                                                    src={`${API_BASE_URL}/api/usr/profile/image/${board.profileImage}`}
                                                    alt="프로필 이미지"
                                                    className="w-full h-full object-contain rounded-full"
                                                    onError={(e) => {
                                                        console.log('이미지 로드 에러:', e); // 디버깅용 로그
                                                        e.target.style.display = 'none';
                                                        e.target.parentElement.innerHTML = `
            <div class="w-full h-full flex items-center justify-center bg-gray-100">
                <FaUser className="text-gray-400 text-lg" />
            </div>
        `;
                                                    }}
                                                />
                                            ) : (
                                                <div
                                                    className="w-full h-full flex items-center justify-center bg-gray-100">
                                                    <FaUser className="text-gray-400 text-lg"/>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                    <Link to={`/mypage/feed/${board.authorIdx}`}
                                          className="text-blue-500 ml-2"> {/* 간격 추가 */}
                                        {board.nickname}
                                    </Link>
                                </div>


                                <h2 className="text-lg font-semibold mt-2">
                                    {truncateText(board.title, 40)}
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    {truncateText(stripHtmlTags(board.content), 60)}
                                </p>
                                <div className="flex justify-between text-xs text-gray-400">
                                    {/* 추천수, 댓글수, 조회수 */}
                                    <div>
                                        추천수: {board.likeCount} | 댓글수: {board.commentCount || 0} | 조회수: {board.viewCount}
                                    </div>
                                    {/* 작성일자 */}
                                    <span>{formatDate(board.regDate)}</span>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            ) : (
                <div className="text-center text-gray-500">
                    검색된 게시글이 없습니다. 다른 검색어를 입력해보세요.
                </div>
            )}

            {/* 페이지 네비게이션 */}
            {boards.length > 0 && (
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
                    {Array.from(
                        { length: groupEnd - groupStart },
                        (_, idx) => groupStart + idx
                    ).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-4 py-2 rounded-md ${
                                pageNum === page
                                    ? "bg-custom-cyan text-white "
                                    : "bg-gray-300 hover:bg-gray-400"
                            }`}
                        >
                            {pageNum + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(groupEnd)}
                        disabled={groupEnd >= totalPages}
                        className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                    >
                        &gt;
                    </button>
                    <button
                        onClick={() => handlePageChange(totalPages - 1)}
                        disabled={page === totalPages - 1}
                        className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                    >
                        &gt;&gt;
                    </button>
                </div>
            )}
        </div>
    );
};

export default BoardList;