import React, { useState } from "react";
import {
  sendEmailVerificationApi,
  updatePasswordApi,
} from "../../usr/searchuserinfo/api/SearchUser";

const Searchpw = ({ onClose }) => {
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 상태
  const [verificationCode, setVerificationCode] = useState(""); // 사용자 입력 인증 코드
  const [serverCode, setServerCode] = useState(null); // 서버 생성 인증 코드
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // 비밀번호 변경 모달 상태

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  }); // 새 비밀번호와 확인 비밀번호 상태

  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    userId: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
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

  const handleSubmit = () => {
    if (!isEmailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
    setIsPasswordModalOpen(true); // 비밀번호 변경 모달 열기
  };

  const handlePasswordSubmit = async () => {
    if (!passwords.newPassword || !passwords.confirmPassword) {
      alert("새 비밀번호와 비밀번호 확인을 모두 입력해주세요.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
      return;
    }

    try {
      const responseData = await updatePasswordApi({
        userId: formData.userId,
        email: formData.email,
        newPassword: passwords.newPassword,
      });

      // 성공적으로 처리된 경우
      alert(responseData.message || "비밀번호가 성공적으로 변경되었습니다.");
      onClose(); // 전체 모달 닫기
    } catch (error) {
      // 실패 시 에러 메시지 표시
      alert(error.message || "비밀번호 변경 중 문제가 발생했습니다.");
    }
  };

  return (
    <div>
      {!isPasswordModalOpen ? (
        <>
          <h2>비밀번호 찾기</h2>
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
            type="text"
            name="userId"
            placeholder="아이디"
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
            placeholder="인증 코드 입력"
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
          <button onClick={handleSubmit}>비밀번호 찾기</button>
        </>
      ) : (
        <div>
          <h2>새 비밀번호 설정</h2>
          <input
            type="password"
            name="newPassword"
            placeholder="새 비밀번호"
            onChange={handlePasswordChange}
          />
          <br />
          <input
            type="password"
            name="confirmPassword"
            placeholder="새 비밀번호 확인"
            onChange={handlePasswordChange}
          />
          <br />
          <button onClick={handlePasswordSubmit}>비밀번호 변경</button>
        </div>
      )}
    </div>
  );
};

export default Searchpw;
