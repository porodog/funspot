import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_ROOT;

export const getInfoApi = async() => {
    const accessToken = localStorage.getItem("access_token");
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        params: {
            userId: "12314"
        }
    };
    return await axios.get(`${API_BASE_URL}/api/usr/mypage/info`, config);
}