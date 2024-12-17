import React from 'react';
import axios from 'axios';

import { useNavigate } from "react-router-dom";

const DeleteBoard = ({ id }) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        axios
            .delete(`http://localhost:8080/api/boards/${id}`)
            .then(() => {
                alert("게시글이 삭제되었습니다.");
                navigate("/board/list"); // 삭제 후 목록으로 이동
            })
            .catch((error) => {
                console.error("Error deleting post:", error);
            });
    };

    return <button onClick={handleDelete}>삭제</button>;
};

export default DeleteBoard;

