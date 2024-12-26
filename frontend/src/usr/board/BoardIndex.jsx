import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import BasicLayout from "../../../src/common/layout/BasicLayout";
import { useBasic } from "../../common/context/BasicContext"; // 로그인 정보 가져오기

function BoardIndex() {
    const { userInfo } = useBasic(); // 로그인 상태 가져오기
    const navigate = useNavigate(); // React Router Navigation

    const handleRefresh = () => {
        // 현재 경로를 다시 로드
        navigate("", { replace: true });
        navigate("/board", { replace: true });
    };

    return (
        <div>
            <BasicLayout>

            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    {/* 홈 링크 */}
                    <button
                        onClick={handleRefresh}
                        className="text-blue-500 font-semibold"
                    >
                        [게시판 홈]
                    </button>

                    {/* 로그인 상태에서만 글쓰기 버튼 노출 */}
                    {userInfo && (
                        <Link to="/board/create" className="text-green-500 font-semibold">
                            [글쓰기]
                        </Link>
                    )}
                </div>

                {/* 라우팅된 하위 페이지 렌더링 */}
                <Outlet />
            </div>

            </BasicLayout>
        </div>
    );
}

export default BoardIndex;
