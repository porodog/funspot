import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

const API_BASE_URL = process.env.REACT_APP_API_ROOT;
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

// Quill Toolbar 설정
const toolbarOptions = [
    [{ header: [1, 2, 3, false] }], // 헤더 옵션
    ["bold", "italic", "underline", "strike"], // 텍스트 스타일
    [
        { align: "" }, // 좌측 정렬
        { align: "center" }, // 중앙 정렬
        { align: "right" }, // 우측 정렬
    ],
    [{ color: [] }], // 글 색상 변경
    ["image", "link"], // 이미지 및 링크 삽입
    ["clean"], // 포맷 제거
];

const EditBoard = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const quillRef = useRef(null);

    // 게시글 불러오기
    useEffect(() => {
        axios
            .get(`/api/boards/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setContent(response.data.content);
            })
            .catch((error) => {
                console.error("Error fetching board:", error);
                alert("게시글을 불러오는 중 문제가 발생했습니다.");
            });
    }, [id]);

    // 이미지 핸들러
    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await axios.post("/api/images/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                const imageUrl = response.data.url;
                const editor = quillRef.current.getEditor();
                const range = editor.getSelection();
                editor.insertEmbed(range.index, "image", imageUrl);
            } catch (error) {
                console.error("이미지 업로드 실패:", error);
                alert("이미지만 업로드 가능합니다.");
            }
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("제목을 입력해주세요.");
            return;
        }
        if (title.length > 100) {
            alert("제목은 최대 100글자까지 작성할 수 있습니다.");
            return;
        }

        const sanitizedContent = DOMPurify.sanitize(content);
        const contentTextLength = sanitizedContent.replace(/<[^>]*>/g, "").trim().length;

        if (!contentTextLength) {
            alert("내용을 입력해주세요.");
            return;
        }
        if (contentTextLength > 5000) {
            alert("내용은 최대 5000글자까지 작성할 수 있습니다.");
            return;
        }

        try {
            await axios.put(
                `/api/boards/${id}`,
                { title, content: sanitizedContent },
                { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
            );

            alert("게시글이 성공적으로 수정되었습니다.");
            navigate(`/board/detail/${id}`);
        } catch (error) {
            console.error("게시글 수정 실패:", error);
            alert("게시글 수정에 실패했습니다.");
        }
    };

    return (
        <div className="container mx-auto p-6 border rounded-md shadow-sm bg-white">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">게시글 수정</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="제목 (최대 100글자)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={100}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                    <p className="text-sm text-gray-500 text-right">{title.length} / 100</p>
                </div>
                <div className="mb-4">
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        ref={quillRef}
                        style={{ height: "300px" }}
                        modules={{
                            toolbar: {
                                container: toolbarOptions,
                                handlers: { image: imageHandler },
                            },
                        }}
                    />
                </div>
                <p className="text-sm text-gray-500 text-right mb-4">
                    {content.replace(/<[^>]*>/g, "").length} / 5000
                </p>
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => navigate(`/board/detail/${id}`)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-custom-cyan text-white rounded-md hover:bg-emerald-600"
                    >
                        수정
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBoard;
