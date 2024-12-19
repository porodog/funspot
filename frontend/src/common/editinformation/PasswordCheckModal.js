import React, { useState, useEffect } from "react";
import axios from "axios";
import usePostTokenCheck from "../hook/usePostTokenCheck"; // 토큰 검증 훅

export const API_BASE_URL = process.env.REACT_APP_API_ROOT;
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // 쿠키 사용 여부 설정

export default function PasswordCheckModal({ onSuccess, onClose }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);

  // 토큰 체크 훅 실행
  usePostTokenCheck();

  useEffect(() => {
    // 토큰이 유효한지 확인하는 요청 (필요한 경우)
    const checkTokenValidity = async () => {
      try {
        const response = await axios.post("/api/usr/login/token/check");
        if (response.status === 200) {
          setIsTokenValid(true);
        }
      } catch (err) {
        console.error("Token validation failed:", err);
        setIsTokenValid(false);
      }
    };

    checkTokenValidity();
  }, []);

  const handleCheckPassword = async () => {
    if (!isTokenValid) {
      setError("유효한 로그인 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `/api/user/check-password`,
        { password }, // body로 데이터 전달
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        onSuccess(); // 비밀번호 확인 성공 시 실행
      } else {
        setError("비밀번호가 일치하지 않습니다.");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setError("서버 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white w-80 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-center">비밀번호 확인</h2>
        <input
          type="password"
          placeholder="현재 비밀번호 입력"
          className="border w-full p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCheckPassword();
            }
          }}
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="flex justify-between">
          <button
            onClick={handleCheckPassword}
            className="w-1/2 bg-custom-cyan text-white px-4 py-2 rounded hover:bg-emerald-400 transition"
          >
            확인
          </button>
          <button
            onClick={onClose}
            className="w-1/2 ml-2 bg-custom-cyan text-white px-4 py-2 rounded hover:bg-emerald-400 transition"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
