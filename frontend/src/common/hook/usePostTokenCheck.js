import { useEffect } from "react";
import { useBasic } from "../context/BasicContext"; // context에서 userIdx와 setUserIdx를 사용
import axios from "axios";

export const API_BASE_URL = process.env.REACT_APP_API_ROOT;
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // 쿠키사용여부 설정

// 커스텀 훅: usePostTokenCheck
const usePostTokenCheck = () => {
  const { setUserIdx } = useBasic(); // Context에서 setUserIdx를 가져옴

  useEffect(() => {
    // postTokenCheck 함수 호출
    const postTokenCheck = async () => {
      try {
        const res = await axios.post("/api/usr/login/token/check");
        console.log("postTokenCheck userIdx >> " + res.data);
        setUserIdx(res.data); // userIdx 상태 업데이트
      } catch (err) {
        console.error("Error during token check:", err);
      }
    };

    postTokenCheck();
  }, [setUserIdx]); // 의존성 배열에 setUserIdx를 넣어주어 업데이트가 필요할 때만 호출
};

export default usePostTokenCheck;
