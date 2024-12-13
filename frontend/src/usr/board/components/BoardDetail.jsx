import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BoardDetail = () => {
    const { id } = useParams();
    const [board, setBoard] = useState(null);

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

    if (!board) {
        return <p>Loading...</p>;
    }

    const formatDate = (dateString) => {
        if (!dateString) return "날짜 정보 없음";
        const date = new Date(dateString);
        return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
    };


    return (
        <div>
            <h1>{board.title}</h1>
            <p>{board.content}</p>
            <p>작성일: {formatDate(board.reg_date)}</p>
            {board.mod_date && board.mod_date !== board.reg_date && (
                <p>수정일: {formatDate(board.mod_date)}</p>
            )}
        </div>
    );
};

export default BoardDetail;
