import React from "react";
import { Link, Outlet } from "react-router-dom";
import BasicLayout from "../../../src/common/layout/BasicLayout";
import { useBasic } from "../../common/context/BasicContext";
import GoBackButton from "../../common/hook/useBackbutton"; // 로그인 정보 가져오기

function BoardIndex() {
    const { userInfo } = useBasic(); // 로그인 상태 가져오기

    const handleRefresh = () => {
        // 페이지를 새로고침
        window.location.href = "/board";
    };

    return (
        <div>

            <BasicLayout>
                <GoBackButton />
                <div className="container mx-auto p-4">
                    <div className="flex justify-end items-center mb-4">
                        {/*/!* 홈 링크 *!/*/}
                        {/*<button*/}
                        {/*    onClick={handleRefresh}*/}
                        {/*    className="text-blue-500 font-semibold"*/}
                        {/*>*/}
                        {/*    [게시판 홈]*/}
                        {/*</button>*/}

                        {/* 로그인 상태에서만 글쓰기 버튼 노출 */}
                        {userInfo && (
                            <Link to="/board/create" className="px-4 py-2 bg-custom-cyan text-white rounded-md hover:bg-emerald-600 transition"
                                 >
                                글쓰기
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
