import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_ROOT;

export const sendEmailVerificationApi = (data) => {
  return axios.post(`${API_BASE_URL}/api/usr/email/send-verification`, data);
};

export const searchIdApi = async (data) => {
  return axios.post(`${API_BASE_URL}/api/usr/searchuserinfo/search-id`, data); // API 경로와 데이터를 서버에 전송
};

export const updatePasswordApi = async (data) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_ROOT}/api/usr/searchuserinfo/update-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      // HTTP 상태 코드가 200이 아닌 경우 에러 처리
      const errorData = await response.json(); // JSON으로 파싱
      throw new Error(errorData.error || "비밀번호 변경 실패");
    }

    return await response.json(); // 성공 시 서버의 JSON 응답 반환
  } catch (error) {
    console.error("비밀번호 변경 요청 중 오류:", error.message);
    throw error;
  }
};
