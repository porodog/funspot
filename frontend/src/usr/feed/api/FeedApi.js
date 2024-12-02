import axios from "axios";

export const API_BASE_URL = process.env.REACT_APP_API_ROOT;
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // 쿠키사용여부 설정

// 목록조회
export const getFeedListApi = async (param) => {
    const config = {
        params: param,
    };
    const res = await axios.get(`/api/usr/feed`, config);
    return res.data;
};

// 상세조회
export const getFeedDetailApi = async (idx) => {
    const accessToken = localStorage.getItem("access_token") || "";
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    const res = await axios.get(`${API_BASE_URL}/api/usr/feed/${idx}`, config);
    return res.data;
};

// 신규등록
export const postFeedInsertApi = async (form) => {
    const accessToken = localStorage.getItem("access_token") || "";
    const header = {
        header: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
        },
    };
    const res = await axios.post(`${API_BASE_URL}/api/usr/feed`, form, header);
    return res.data;
};

// 댓글목록 조회
export const getFeedCommentListApi = async (idx) => {
    const accessToken = localStorage.getItem("access_token") || "";
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    const res = await axios.get(
        `${API_BASE_URL}/api/usr/feed/comment/${idx}`,
        config
    );
    return res.data;
};

// 좋아요 등록, 삭제
export const feedLikeApi = async (param) => {
    const {idx, likedYn} = param;

    if (likedYn) {
        const res = await axios.post(`/api/usr/feed/like/${idx}`);
        return res.data;
    } else {
        const res = await axios.delete(`/api/usr/feed/like/${idx}`);
        return res.data;
    }
};

// 댓글 작성
export const postCommentApi = async (param) => {
    const {idx, content} = param;
    const accessToken = localStorage.getItem("access_token") || "";
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        params: {content},
    };

    const res = await axios.post(
        `${API_BASE_URL}/api/usr/feed/comment/${idx}`,
        null,
        config
    );
    return res.data;
};
