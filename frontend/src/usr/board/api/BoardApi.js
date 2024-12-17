import axios from 'axios';

const API_URL = 'http://localhost:8080/api/boards'; // API 서버 URL

// 1. 게시글 목록 조회
export const getPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data; // 게시글 목록 반환
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

// 2. 게시글 작성
export const createPost = async (post) => {
    try {
        const token = localStorage.getItem("authToken"); // 인증 토큰 가져오기
        const response = await axios.post(`${API_URL}`, post, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // 생성된 게시글 반환
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

// 3. 게시글 수정
export const updatePost = async (id, updatedPost) => {
    try {
        const token = localStorage.getItem("authToken"); // 인증 토큰 가져오기
        const response = await axios.put(`${API_URL}/${id}`, updatedPost, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // 수정된 게시글 반환
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

// 4. 게시글 삭제 (논리적 삭제)
export const deletePost = async (id) => {
    try {
        const token = localStorage.getItem("authToken"); // 인증 토큰 가져오기
        await axios.patch(
            `${API_URL}/${id}/delete`, // 논리적 삭제 경로
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return id; // 삭제된 게시글의 ID 반환
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};
