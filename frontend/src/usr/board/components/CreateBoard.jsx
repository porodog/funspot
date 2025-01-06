import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useBasic } from "../../../common/context/BasicContext";
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
    [{ color: [] }], // 글 색상
    ["image", "link"], // 이미지 및 링크 삽입
    ["clean"], // 포맷 제거
];

const CreateBoard = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { userInfo } = useBasic();
    const navigate = useNavigate();
    const quillRef = useRef(null);

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
        
        // 제목과 내용 유효성 검사
        if (!title.trim()) {
            alert("제목을 입력해주세요.");
            return;
        }

        if (!content.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }

        if (!userInfo) {
            alert("로그인이 필요합니다.");
            return;
        }

        // 제목 길이 제한 체크
        if (title.length > 100) {
            alert("제목은 100자를 초과할 수 없습니다.");
            return;
        }

        // 내용 길이 제한 체크 (HTML 태그 제외)
        const plainContent = content.replace(/<[^>]*>/g, "");
        if (plainContent.length > 5000) {
            alert("내용은 5000자를 초과할 수 없습니다.");
            return;
        }

        const sanitizedContent = DOMPurify.sanitize(content);

        try {
            const token = localStorage.getItem("authToken");
            await axios.post("/api/boards", {
                title,
                content: sanitizedContent,
                nickname: userInfo.nickname,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate("/board");
        } catch (error) {
            console.error("게시글 작성 실패:", error);
            alert("게시글 작성에 실패했습니다.");
        }
    };

    return (
        <div className="container mx-auto p-6 border rounded-md shadow-sm bg-white">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">게시글 작성</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="제목 (최대 100글자)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                    <p className="text-sm text-gray-500 text-right">{title.length} / 100</p>
                </div>
                <div className="mb-4">
                    <ReactQuill
                        key="quill-editor" // ReactQuill 재마운트 방지
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
                <button
                    type="submit"
                    className="w-full bg-custom-cyan text-white py-2 rounded-md hover:bg-emerald-600"
                >
                    작성하기
                </button>
            </form>
        </div>
    );
};

export default CreateBoard;
