import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useBasic } from "../../../common/context/BasicContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

// Quill Toolbar 설정
const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["image", "link"],
    ["clean"],
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
                const response = await axios.post("http://localhost:8080/api/images/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                const imageUrl = response.data.url;
                const editor = quillRef.current.getEditor();
                const range = editor.getSelection();
                editor.insertEmbed(range.index, "image", imageUrl);
            } catch (error) {
                console.error("이미지 업로드 실패:", error);
                alert("이미지 업로드에 실패했습니다.");
            }
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userInfo) {
            alert("로그인이 필요합니다.");
            return;
        }

        const sanitizedContent = DOMPurify.sanitize(content);

        try {
            const token = localStorage.getItem("authToken");
            await axios.post("http://localhost:8080/api/boards", {
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
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                >
                    작성하기
                </button>
            </form>
        </div>
    );
};

export default CreateBoard;
