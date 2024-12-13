import axios from 'axios';

const API_URL = 'http://localhost:8080/api/boards'; // API 서버 URL

// 1. 게시글 목록 조회
export const getPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        return response.data; // 게시글 목록 반환
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

// 2. 게시글 작성
export const createPost = async (post) => {
    try {
        const response = await axios.post(`${API_URL}/posts`, post);
        return response.data; // 생성된 게시글 반환
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

// 3. 게시글 수정
export const updatePost = async (id, updatedPost) => {
    try {
        const response = await axios.put(`${API_URL}/posts/${id}`, updatedPost);
        return response.data; // 수정된 게시글 반환
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

// 4. 게시글 삭제
export const deletePost = async (id) => {
    try {
        await axios.delete(`${API_URL}/posts/${id}`);
        return id; // 삭제된 게시글의 ID 반환
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};
