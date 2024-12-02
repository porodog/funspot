import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_ROOT;

export const postLoginApi = async (param, callback) => {
  const config = {
    withCredentials: true,
  };

  await axios
    .post(`${API_BASE_URL}/api/usr/login`, param, config)
    .then((res) => {
      callback({ status: res.status, data: res.data }); // 닉네임 포함 데이터 반환
    })
    .catch((err) => {
      console.log(err);
      callback({ status: err.response?.status || 500, data: null });
    });
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
