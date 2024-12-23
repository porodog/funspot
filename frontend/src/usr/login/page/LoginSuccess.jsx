import { useNavigate } from "react-router-dom";
import { useBasic } from "../../../common/context/BasicContext";
import { useEffect } from "react";
import axios from "axios";

const LoginSuccess = () => {
  const { setUserInfo } = useBasic();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.post("/api/usr/login/token/check");
        if (response.status === 200 && response.data) {
          if (response.data.useYn === "N") {
            // 탈퇴된 회원 처리
            alert("탈퇴된 회원입니다. 로그인할 수 없습니다.");
            navigate("/login"); // 로그인 페이지로 이동
            return; // 더 이상 진행하지 않음
          }
          alert(`${response.data.nickname}님, 환영합니다!`);
          setUserInfo(response.data); // 사용자 정보 업데이트
          setUserInfo(response.data.userId);
          setUserInfo(response.data.nickname);
          navigate("/"); // 메인 페이지로 리다이렉트
        } else {
          alert("사용자 정보를 가져올 수 없습니다. 다시 로그인해주세요.");
          navigate("/login"); // 로그인 페이지로 이동
        }
      } catch (error) {
        console.error("Error fetching user info after OAuth login:", error);
        alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
        navigate("/login");
      }
    };
    fetchUserInfo();
  }, [setUserInfo, navigate]);

  return <></>;
};

export default LoginSuccess;
