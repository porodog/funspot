import axios from "axios";

/**
 * 토큰 조회 및 재발급 커스텀 훅 (수정중)
 * >> 비로그인 상태에서 접근 시 강제로 로그인페이지 이동처리 (취소)
 * >> true, false 리턴 처리로 변경
 *
 * 1. 엑세스 토큰 조회 (postAccessTokenApi)
 *  1-1. 정상 -> true
 *  1-2. 실패 -> 리프레시 토큰 조회 + 엑세스 토큰 재발급 시도 (postRefreshTokenApi)
 *      1-2-1. 정상 -> true
 *      1-2-2. 실패 -> 로그인페이지 이동(취소) -> false + 엑세스 토큰 로컬스토리지 삭제
 * */
const API_BASE_URL = process.env.REACT_APP_API_ROOT;

export const useCheckToken = () => {

  const postAccessTokenApi = async () => {
    const accessToken = localStorage.getItem("access_token");
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/token/access`, null, config);
      if (response.status === 200 && response.data.result) {
        console.log("엑세스 토큰 인증 성공");
        return true;
      }

      console.log("엑세스 토큰 인증 실패");
      return false;
    } catch (err) {
      console.error("엑세스 토큰 실패:", err);
      return false;
    }
  };

  const postRefreshTokenApi = async () => {
    const config = {
      withCredentials: true,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/token/refresh`, null, config);

      if (response.status === 200 && response.data.accessToken) {
        // 새로운 엑세스 토큰을 로컬 스토리지에 저장
        localStorage.setItem("access_token", response.data.accessToken);
        console.log("토큰 재발급 성공");
        return true;
      }

      console.log("토큰 재발급 실패");
      return false;
    } catch (err) {
      console.error("리프레시 토큰 실패:", err);
      return false;
    }
  };

  const checkToken = async () => {
    if(await postAccessTokenApi()) {
       return true;
    }

    if(await postRefreshTokenApi()) {
      return true;
    }

    localStorage.removeItem("access_token");
    return false;
  };

  return { checkToken };
};
