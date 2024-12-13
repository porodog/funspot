import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditBoard = () => {
    const { id } = useParams();
    const [board, setBoard] = useState({ title: "", content: "" });
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/boards/${id}`)
            .then((response) => {
                setBoard(response.data);
            })
            .catch((error) => {
                console.error("Error fetching board:", error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!board.title.trim() || !board.content.trim()) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }
        axios
            .put(`http://localhost:8080/api/boards/${id}`, board)
            .then(() => {
                navigate("/board/list"); // 수정 후 이동
            })
            .catch((error) => {
                console.error("Error updating post:", error);
            });
    };


    return (
        <div>
            <h1>게시글 수정</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목</label>
                    <input
                        type="text"
                        value={board.title}
                        onChange={(e) =>
                            setBoard({ ...board, title: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label>내용</label>
                    <textarea
                        value={board.content}
                        onChange={(e) =>
                            setBoard({ ...board, content: e.target.value })
                        }
                        required
                    />
                </div>
                <button type="submit">수정</button>
            </form>
        </div>
    );
};

export default EditBoard;
