import axios from "axios";

// auth.js
export const getToken = () => {
    return localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
};

export const isAuthenticated = () => {
    const token = getToken();
    console.log("토큰 상태 확인:", token); // 토큰 상태 확인 로그
    return !!token; // 토큰이 존재하면 true, 없으면 false
};

