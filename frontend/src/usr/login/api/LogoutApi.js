import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_ROOT;
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // 쿠키 사용 여부 설정

// 로그아웃 API
export const postLogoutApi = async () => {
  try {
    const response = await axios.post(`/api/usr/logout/logout`, {});

    // 상태 코드 200: 로그아웃 성공
    if (response.status === 200) {
      console.log("로그아웃 성공:", response.status);
      return {
        status: response.status,
        success: true,
        message: "로그아웃 성공",
      };
    }

    // 상태 코드가 200이 아닌 경우(이론적으로 여기 도달하지 않음)
    return {
      status: response.status,
      success: false,
      message: "알 수 없는 오류 발생",
    };
  } catch (err) {
    console.error("로그아웃 요청 실패:", err);

    // 상태 코드 401: 토큰이 유효하지 않음
    if (err.response?.status === 401) {
      return {
        status: 401,
        success: false,
        message: "토큰이 유효하지 않습니다. 다시 로그인해주세요.",
      };
    }

    // 기타 오류
    return {
      status: err.response?.status || 500,
      success: false,
      message: "로그아웃 중 문제가 발생했습니다.",
    };
  }
};
