import React, { useState, useEffect } from "react";
import axios from "axios";
import AddressModal from "../signupmodal/AddressModal";
import usePostTokenCheck from "../hook/usePostTokenCheck";

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
  });
  const [originalPhone, setOriginalPhone] = useState("");
  const [isPhoneChecked, setIsPhoneChecked] = useState(true); // 핸드폰 중복 확인 상태
  const [addressModalOpen, setAddressModalOpen] = useState(false);

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
        const response = await axios.get("/api/user/profile");
        setUserInfo({
          ...response.data,
          newPassword: "",
          confirmPassword: "",
        });
        setOriginalPhone(response.data.phone);
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

          {/* 수정 가능 필드 */}
          <input
            name="newPassword"
            placeholder="영문, 숫자, 특수문자 포함 8~16자"
            className="border w-full p-2 rounded"
            type="password"
            onChange={handleChange}
          />
          {errors.newPassword && (
            <p className="text-red-500">{errors.newPassword}</p>
          )}
          <input
            name="confirmPassword"
            placeholder="비밀번호 확인"
            className="border w-full p-2 rounded"
            type="password"
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
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
              placeholder="우편번호"
              className="border w-2/3 p-2 rounded"
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
            placeholder="주소"
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

          <AddressModal
            isOpen={addressModalOpen}
            onClose={() => setAddressModalOpen(false)}
            onComplete={(data) => {
              setUserInfo((prev) => ({
                ...prev,
                address: data.address,
                zonecode: data.zonecode,
              }));
            }}
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-custom-cyan text-white px-4 py-2 rounded hover:bg-emerald-400 mr-2"
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
    </div>
  );
}
