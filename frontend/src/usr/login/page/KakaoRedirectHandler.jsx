import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// API 기본 URL 및 쿠키 설정
const API_BASE_URL = process.env.REACT_APP_API_ROOT;
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // 쿠키사용여부 설정

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  useEffect(() => {
    const handleKakaoLogin = async () => {
      if (!code) {
        console.error("Authorization code가 없습니다.");
        navigate("/login");
        return;
      }

      try {
        // 카카오 로그인 API 호출
        const response = await axios.post("/api/auth/kakao/login", { code });

        if (response.data.success) {
          // 로그인 성공
          alert(response.data.message || "로그인 성공!");
          navigate("/login-success");
        } else {
          // 회원가입 필요
          alert(response.data.message || "회원가입이 필요합니다.");
          navigate("/social-signup");
        }
      } catch (error) {
        console.error("로그인 중 오류 발생:", error);

        if (error.response) {
          alert(
            `로그인 실패: ${
              error.response.data?.message ||
              "서버와의 통신 중 오류가 발생했습니다."
            }`
          );
        } else {
          alert("로그인 실패: 네트워크 오류");
        }

        navigate("/login");
      }
    };

    handleKakaoLogin();
  }, [code, navigate]);

  return <div>로그인 처리 중입니다...</div>;
};

export default KakaoRedirectHandler;
