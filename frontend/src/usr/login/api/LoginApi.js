import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_ROOT;

export const postLoginApi = async (param) => {
  const config = {
    withCredentials: true,
  };

  try {
    const res = await axios.post(`${API_BASE_URL}/api/usr/login`, param, config);
    return { status: res.status, data: res.data }; // 성공 시 반환
  } catch (err) {
    console.log(err);
    return { status: err.response?.status || 500, data: null }; // 실패 시 반환
  }
};


// 사용자 정보 가져오기 API
// export const fetchUserInfo = async () => {
//   try {
//     const token = localStorage.getItem("access_token") || "";
//     // if (!token) throw new Error("토큰이 존재하지 않습니다.");

//     const response = await axios.get(`${API_BASE_URL}/api/usr/me`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     return { status: response.status, data: response.data };
//   } catch (err) {
//     console.error("사용자 정보 요청 실패:", err);
//     return { status: err.response?.status || 500, data: null };
//   }
// };
