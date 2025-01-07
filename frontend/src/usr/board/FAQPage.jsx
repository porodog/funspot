import React from "react";
import { Link, Outlet } from "react-router-dom";
import BasicLayout from "../../../src/common/layout/BasicLayout";
import { useBasic } from "../../common/context/BasicContext";
import GoBackButton from "../../common/hook/useBackbutton"; // 로그인 정보 가져오기

const FAQPage = () => {
    const { userInfo } = useBasic(); // 로그인 상태 가져오기
    const faqData = [
        {
            id: 1,
            question: "회원가입은 어떻게 하나요?",
            answer: "회원가입은 상단 메뉴의 '회원가입' 버튼을 클릭하고, 필수 정보를 입력하면 완료됩니다.",
        },
        {
            id: 2,
            question: "비밀번호를 잊어버렸습니다. 어떻게 해야 하나요?",
            answer: "로그인 화면에서 '비밀번호 찾기'를 클릭하면 이메일로 비밀번호 재설정 링크를 받을 수 있습니다.",
        },
        {
            id: 3,
            question: "FAQ 페이지는 무엇인가요?",
            answer: "FAQ 페이지는 자주 묻는 질문과 그 답변을 모아둔 페이지입니다.",
        },
        {
            id: 4,
            question: "게시판 사용은 무료인가요?",
            answer: "네, 게시판은 누구나 무료로 사용 가능합니다.",
        },
        {
            id: 5,
            question: "펀스팟과의 제휴, 협업, 콜라보 문의는 어디로 해야 하나요?",
            answer: "아쉽게도 현재 펀스팟은 제휴서비스, 협업 비즈니스를 진행하지 않고 있습니다.",
        },
    ];

    return (
        <BasicLayout>
            <GoBackButton />
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">자주 묻는 질문 (FAQ)</h1>
            <ul>
                {faqData.map((faq) => (
                    <li
                        key={faq.id}
                        className="mb-4 p-4 border rounded-md shadow-sm transition duration-300"
                        style={{ borderColor: "#25E2B6" }}
                    >
                        <h2 className="text-lg font-semibold">{faq.question}</h2>
                        <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
                    </li>
                ))}
            </ul>
        </div>
        </BasicLayout>
    );
};

export default FAQPage;
