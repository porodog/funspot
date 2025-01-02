import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ userRole }) => {
    const [isVisible, setIsVisible] = useState(false); // 푸터 표시 상태 관리

    useEffect(() => {
        const target = document.getElementById('scrollTarget'); // 관찰 대상 요소

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting); // 대상이 뷰포트에 들어오면 true, 아니면 false
            },
            { threshold: 0.5 } // 요소가 100% 뷰포트에 들어왔을 때만 트리거
        );

        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, []);

    return (
        <>
            <div id="scrollTarget" style={{ height: '10vh' }}> {/* 테스트용 긴 영역 */}
            </div>
            {isVisible && ( // 푸터가 보일 때만 렌더링
                <footer className="bg-gray-500 text-white p-4 w-3/5 text-center fixed bottom-0">
                    <div className="container mx-auto flex justify-between items-center">
                        {/* 로고 이미지를 왼쪽에 배치 */}
                        {/* <div className="flex items-center">
                            <img src="/img/FunSpot.png" alt="FunSpot Logo" className="h-8" /> 
                        </div> */}
                        {/* 텍스트는 중앙으로 배치 */}
                        <div className="text-center items-center flex-grow">
                            <span>&copy; Copyright 2024 ㈜FunSpot All Rights Reserved</span>
                            <p>Designed by Mingbbu | Implement by Codyssey</p>
                        </div>
                        {/* {userRole === 'ROLE_ADMIN' && (
                            <div className='text-center text-custom-cyan'>
                                <Link to={"/admin"}>관리자페이지</Link>
                            </div>
                        )} */}
                    </div>
                </footer>
            )}
        </>
    );

};

export default Footer;
