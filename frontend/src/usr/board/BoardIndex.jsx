import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../../common/component/Header";
import Footer from "../../common/component/Footer";
import { useBasic } from "../../common/context/BasicContext"; // 로그인 정보 가져오기

function BoardIndex() {
    const { userInfo } = useBasic(); // 로그인 상태 가져오기

    return (
        <div>
            <Header />

            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    {/* 홈 링크 */}
                    <Link to="/board" className="text-blue-500 font-semibold">
                        [게시판 홈]
                    </Link>

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

            <Footer />
        </div>
    );
}

export default BoardIndex;
