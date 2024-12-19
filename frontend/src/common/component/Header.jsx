import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBasic } from "../context/BasicContext";
import { postLogoutApi } from "../../usr/login/api/LogoutApi";
import Logo from "../img/FunSpotLogo.jpg";
import Dropdown from "./Dropdown";
import PasswordCheckModal from "../editinformation/PasswordCheckModal";
import UserEditModal from "../editinformation/UserEditModal";

const Header = () => {
  const { userInfo, setUserInfo } = useBasic();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await postLogoutApi();
    if (result.success) {
      setUserInfo(null); // 상태 초기화
      alert(result.message);
      navigate("/"); // 메인 페이지로 이동
    } else {
      alert(result.message);
    }
  };

  const [view, setView] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false); // 비밀번호 확인 모달 열림 상태
  const [isEditModalOpen, setEditModalOpen] = useState(false); // 회원정보 수정 모달 열림 상태

  // 회원정보 수정 모달 열기 (소셜 회원과 자체 회원 구분)
  const handleEditModalOpen = () => {
    if (userInfo.provider !== "LOCAL") {
      setEditModalOpen(true); // 소셜 회원은 바로 수정 모달 열기
    } else {
      setPasswordModalOpen(true); // 자체 회원은 비밀번호 확인 필요
    }
    console.log("provider :" + userInfo.provider);
  };

  // 비밀번호 확인 성공 시 호출
  const handlePasswordSuccess = () => {
    setPasswordModalOpen(false);
    setEditModalOpen(true);
  };

  // 회원정보 수정 모달 닫기
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <header className="bg-white text-black p-4 mb-4 shadow-md rounded-md">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/">
          {/* <h1 className="text-3xl font-bold">FunSpot</h1> */}
          <img src={Logo} alt="펀스팟로고" height="px" width="150px" />
        </a>
        <div>
          {userInfo ? (
            <ul
              onClick={() => {
                setView(!view);
              }}
              className="flex items-center cursor-pointer relative"
            >
              <span className="mr-2 text-gray-800 font-medium">
                {userInfo.nickname}님
              </span>
              <span
                className={`text-lg font-semibold transition-transform duration-500 ease-in-out transform ${
                  view
                    ? "rotate-180 translate-y-1 text-green-600"
                    : "translate-y-0 text-gray-600"
                }`}
              >
                {view ? "▲" : "▼"}
              </span>
              {view && (
                <Dropdown
                  handleLogout={handleLogout}
                  onOpenPasswordModal={handleEditModalOpen} // 수정된 로직 적용
                />
              )}
            </ul>
          ) : (
            <ul className="flex items-center">
              <li>
                <Link to={"/login"} className="mr-2">
                  로그인
                </Link>
              </li>

              <li>
                <Link to={"/signupCheck"}>회원가입</Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* 비밀번호 확인 모달 */}
      {isPasswordModalOpen && (
        <PasswordCheckModal
          onSuccess={handlePasswordSuccess}
          onClose={() => setPasswordModalOpen(false)}
        />
      )}

      {/* 회원정보 수정 모달 */}
      {isEditModalOpen && <UserEditModal onClose={handleCloseEditModal} />}
    </header>
  );
};

export default Header;
