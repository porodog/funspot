import React, { useState, useEffect } from "react";
import axios from "axios";
import AddressModal from "../signupmodal/AddressModal";
import usePostTokenCheck from "../hook/usePostTokenCheck";
import { sendEmailVerificationApi } from "../../usr/signup/api/SignupApi";
import { postLogoutApi } from "../../usr/login/api/LogoutApi";

export const API_BASE_URL = process.env.REACT_APP_API_ROOT;
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

export default function UserEditModal({ onClose }) {
  usePostTokenCheck(); // 토큰 체크

  const [errors, setErrors] = useState({});
  const [isTouched, setIsTouched] = useState({});
  const [userInfo, setUserInfo] = useState({
    userId: "",
    name: "",
    nickname: "",
    email: "",
    birthDate: "",
    phone: "",
    zonecode: "",
    address: "",
    detaileAdd: "",
    newPassword: "",
    confirmPassword: "",
    provider: "",
  });
  const [originalPhone, setOriginalPhone] = useState("");
  const [isPhoneChecked, setIsPhoneChecked] = useState(true); // 핸드폰 중복 확인 상태
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 탈퇴 모달 상태
  const [passwordForDelete, setPasswordForDelete] = useState(""); // 탈퇴용 비밀번호
  const [verificationCode, setVerificationCode] = useState(""); // 사용자 입력 인증 코드
  const [serverCode, setServerCode] = useState(""); // 서버에서 반환한 인증 코드
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 상태

  // 유효성 검사
  useEffect(() => {
    const newErrors = {};
    const phoneRegex = /^(01[016789])-?[0-9]{3,4}-?[0-9]{4}$/;

    if (
      isTouched.newPassword &&
      !userInfo.newPassword.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/
      )
    ) {
      newErrors.newPassword =
        "비밀번호는 영문, 숫자, 특수문자 포함 8~16자여야 합니다.";
    }

    if (
      isTouched.confirmPassword &&
      userInfo.newPassword !== userInfo.confirmPassword
    ) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    if (isTouched.phone && !phoneRegex.test(userInfo.phone)) {
      newErrors.phone = "유효한 핸드폰 번호를 입력해주세요.";
    }

    if (isTouched.zonecode && !userInfo.zonecode) {
      newErrors.zonecode = "우편번호를 입력해주세요.";
    }

    if (isTouched.address && !userInfo.address) {
      newErrors.address = "주소를 입력해주세요.";
    }

    setErrors(newErrors);
  }, [userInfo, isTouched]);

  const autoHyphenPhone = (phone) => {
    return phone
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3")
      .replace(/(-{1,2})$/g, "");
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    let newValue = value;
    if (name === "phone") {
      newValue = autoHyphenPhone(value);
      if (newValue !== originalPhone) {
        setIsPhoneChecked(false); // 핸드폰 번호가 변경되면 중복 체크 상태 초기화
      }
    }

    setUserInfo((prev) => ({ ...prev, [name]: newValue }));
    setIsTouched((prev) => ({ ...prev, [name]: true }));
  };

  // 기존 회원정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/api/user/profile"); // 서버에서 사용자 정보 가져오기
        setUserInfo({
          ...response.data,
          newPassword: "",
          confirmPassword: "",
        });
      } catch (err) {
        console.error("회원 정보 불러오기 실패", err);
      }
    };
    fetchUserInfo();
  }, []);

  const handleSubmit = async () => {
    if (userInfo.newPassword !== userInfo.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "비밀번호가 일치하지 않습니다.",
      }));
      return;
    }

    try {
      // 핸드폰 번호 중복 확인
      if (!isPhoneChecked && userInfo.phone !== originalPhone) {
        const checkPhoneResponse = await axios.post("/api/user/phone-check", {
          phone: userInfo.phone,
        });

        if (checkPhoneResponse.data.isDuplicate) {
          alert("핸드폰 번호가 중복되었습니다.");
          return;
        }
      }

      const response = await axios.post("/api/user/update", userInfo);
      if (response.status === 200) {
        alert("정보 수정이 완료되었습니다.");
        onClose();
      } else {
        alert("수정 실패");
      }
    } catch (err) {
      console.error("정보 수정 실패:", err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleSendEmail = async () => {
    try {
      const response = await sendEmailVerificationApi({
        email: userInfo.email,
      });
      setServerCode(response.data.verificationCode);
      alert("인증 코드가 이메일로 전송되었습니다.");
    } catch (err) {
      console.error("이메일 인증 코드 전송 실패:", err);
      alert("이메일 인증 코드 전송에 실패했습니다.");
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

  const handleDeleteAccount = async () => {
    try {
      if (userInfo.provider === "LOCAL") {
        // 자체 회원 비밀번호 확인
        const response = await axios.post("/api/user/verify-password", {
          password: passwordForDelete,
        });
        if (response.status !== 200) {
          alert("비밀번호가 올바르지 않습니다.");
          return;
        }
      } else if (!isEmailVerified) {
        // 소셜 회원 이메일 인증 확인
        alert("이메일 인증을 완료해주세요.");
        return;
      }

      // 회원 탈퇴 요청 (비활성화 처리)
      const deactivateResponse = await axios.post(
        "/api/usr/searchuserinfo/deactivate",
        {
          userIdx: userInfo.idx,
        }
      );
      console.log("userIdx : " + userInfo.idx);

      if (deactivateResponse.status === 200) {
        alert("탈퇴처리가 정상적으로 완료되었습니다.");

        // 로그아웃 호출
        const logoutResponse = await postLogoutApi();
        if (logoutResponse.success) {
          window.location.href = "/"; // 메인 화면으로 리다이렉트
        } else {
          alert("로그아웃 처리에 실패했습니다.");
        }
      } else {
        alert("탈퇴 요청에 실패했습니다.");
      }
    } catch (err) {
      console.error("회원 탈퇴 실패:", err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
      <div className="relative bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">회원정보 수정</h2>
        <div className="space-y-4">
          {/* 수정 불가 필드 */}
          <input
            value={userInfo.userId}
            readOnly
            className="border w-full p-2 rounded bg-gray-100 text-gray-500"
          />
          <input
            value={userInfo.name}
            readOnly
            className="border w-full p-2 rounded bg-gray-100 text-gray-500"
          />
          <input
            value={userInfo.birthDate}
            readOnly
            className="border w-full p-2 rounded bg-gray-100 text-gray-500"
          />
          <input
            value={userInfo.nickname}
            readOnly
            className="border w-full p-2 rounded bg-gray-100 text-gray-500"
          />
          <input
            value={userInfo.email}
            readOnly
            className="border w-full p-2 rounded bg-gray-100 text-gray-500"
          />
          {userInfo?.provider === "LOCAL" ? (
            <>
              <input
                name="newPassword"
                placeholder="비밀번호"
                className="border w-full p-2 rounded"
                type="password"
                onChange={handleChange}
              />
              <input
                name="confirmPassword"
                placeholder="비밀번호 확인"
                className="border w-full p-2 rounded"
                type="password"
                onChange={handleChange}
              />
            </>
          ) : (
            <p>소셜 회원은 비밀번호를 수정할 수 없습니다.</p>
          )}
          <input
            name="phone"
            placeholder="핸드폰"
            className="border w-full p-2 rounded"
            value={userInfo.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}

          <div className="flex items-center space-x-2">
            <input
              name="zonecode"
              type="text"
              placeholder="우편번호"
              className="border w-2/3 p-2 rounded"
              readOnly
              value={userInfo.zonecode}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setAddressModalOpen(true)}
              className="border bg-custom-cyan text-white rounded-3xl p-2 w-1/3 hover:bg-emerald-400"
            >
              주소 찾기
            </button>
          </div>
          {errors.zonecode && <p className="text-red-500">{errors.zonecode}</p>}
          <input
            name="address"
            type="text"
            placeholder="주소"
            readOnly
            className="border w-full p-2 rounded"
            value={userInfo.address}
            onChange={handleChange}
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
          <input
            name="detaileAdd"
            placeholder="상세주소"
            className="border w-full p-2 rounded"
            value={userInfo.detaileAdd}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between mt-4">
          {/* 왼쪽 끝에 위치한 회원탈퇴 버튼 */}
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
          >
            회원탈퇴
          </button>

          {/* 오른쪽 끝에 위치한 취소와 정보수정 버튼 그룹 */}
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="bg-custom-cyan text-white px-4 py-2 rounded hover:bg-emerald-400"
            >
              정보수정
            </button>
          </div>
        </div>
        <AddressModal
          isOpen={addressModalOpen}
          onClose={() => setAddressModalOpen(false)}
          onComplete={(data) => {
            setUserInfo({
              ...userInfo,
              address: data.address,
              zonecode: data.zonecode,
            });
            setAddressModalOpen(false);
          }}
        />
      </div>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">정말 탈퇴하시겠습니까?</h3>
            {userInfo.provider === "LOCAL" ? (
              <>
                <input
                  type="password"
                  placeholder="비밀번호 입력"
                  value={passwordForDelete}
                  onChange={(e) => setPasswordForDelete(e.target.value)}
                  className="border w-full p-2 rounded mb-4"
                />
              </>
            ) : (
              <>
                {!isEmailVerified && (
                  <>
                    <button
                      onClick={handleSendEmail}
                      className="bg-custom-cyan text-white px-4 py-2 rounded mb-2"
                    >
                      이메일 인증코드 전송
                    </button>
                    <input
                      type="text"
                      placeholder="인증 코드 입력"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="border w-full p-2 rounded mb-2"
                    />
                    <button
                      onClick={handleVerifyCode}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      인증 코드 확인
                    </button>
                  </>
                )}
                {isEmailVerified && (
                  <p className="text-green-500">이메일 인증 완료</p>
                )}
              </>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              >
                취소
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
