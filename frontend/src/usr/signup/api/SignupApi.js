import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_ROOT;

export const postSignupApi = async (param) => {
    const config = {
        withCredentials: true
    };

    try {
        const res = await axios.post(`${API_BASE_URL}/api/usr/signup/signup`, param, config);
        return {status: res.status, data: res.data};
    } catch (err) {
        console.error("API error:", err);
        const status = err.response ? err.response.status : 500;
        return {status, data: null};
    }
};