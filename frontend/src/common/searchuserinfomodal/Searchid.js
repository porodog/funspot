import React from "react";
import { useState } from "react";
import {
  sendEmailVerificationApi,
  searchIdApi,
} from "../../usr/searchuserinfo/api/searchuser";

const Searchid = ({ onClose, focusIdField }) => {
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 상태
  const [verificationCode, setVerificationCode] = useState(""); // 사용자 입력 인증 코드
  const [serverCode, setServerCode] = useState(null); // 서버 생성 인증 코드

  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    email: "",
  });
  const [searchResult, setSearchResult] = useState(null); // 아이디 검색 결과
  const [isSearching, setIsSearching] = useState(false); // 검색 중 상태

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendEmailVerification = async () => {
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    try {
      const response = await sendEmailVerificationApi({
        email: formData.email,
      });
      if (response.status === 200) {
        setServerCode(response.data.verificationCode); // 서버에서 보낸 인증 코드 저장
        alert("인증 코드가 이메일로 전송되었습니다.");
      } else {
        alert("이메일 인증 요청 실패. 다시 시도해주세요.");
      }
    } catch (error) {
      alert("서버와의 통신 중 문제가 발생했습니다.");
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode === serverCode) {
      setIsEmailVerified(true);
      alert("이메일 인증이 완료되었습니다.");
    } else {
      alert("인증 코드가 일치하지 않습니다.");
    }
  };

  const handleSubmit = async () => {
    if (!isEmailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    try {
      setIsSearching(true);
      const response = await searchIdApi(formData);
      if (response.status === 200) {
        setSearchResult(response.data); // 검색 결과 저장
      } else {
        alert("아이디를 찾을 수 없습니다.");
      }
    } catch (error) {
      alert("아이디 검색 중 문제가 발생했습니다.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div>
      <h2>아이디 찾기</h2>
      {!searchResult ? (
        <>
          <input
            type="text"
            name="name"
            placeholder="이름"
            onChange={handleInputChange}
          />
          <br />
          <input
            type="date"
            name="birthDate"
            placeholder="생년월일"
            onChange={handleInputChange}
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="이메일"
            onChange={handleInputChange}
            disabled={isEmailVerified}
          />
          <button
            type="button"
            onClick={handleSendEmailVerification}
            disabled={isEmailVerified}
          >
            인증 메일 보내기
          </button>
          <br />
          <input
            type="text"
            name="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            disabled={isEmailVerified}
          />
          <button
            type="button"
            onClick={handleVerifyCode}
            disabled={isEmailVerified}
          >
            인증 확인
          </button>
          <br />
          <button onClick={handleSubmit} disabled={isSearching}>
            {isSearching ? "검색 중..." : "아이디 찾기"}
          </button>
        </>
      ) : (
        <div>
          {searchResult.userId ? (
            <p>
              찾으시는 아이디는 <strong>{searchResult.userId}</strong> 입니다.
            </p>
          ) : (
            <p>입력하신 정보와 일치하는 아이디가 없습니다.</p>
          )}
          <button
            onClick={() => {
              onClose();
              focusIdField();
            }}
          >
            로그인하러 가기
          </button>
        </div>
      )}
    </div>
  );
};

export default Searchid;
