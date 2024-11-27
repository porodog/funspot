import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSignupApi } from "../api/SignupApi";
import AddressModal from "../../../common/AddressModal";

const SignupComponent = () => {
    const [formData, setFormData] = useState({
        userId: "",
        name: "",
        birthDate: "",
        nickname: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: "",
        address: "",
        detailAddress: "",
        zonecode: "",
    });

    const [isOpen, setIsOpen] = useState(false); // 모달 팝업 상태
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.userId) formErrors.userId = "아이디를 입력해주세요";
        if (!formData.name) formErrors.name = "이름을 입력해주세요";
        if (!formData.birthDate) formErrors.birthDate = "생년월일을 입력해주세요";
        if (!formData.nickname) formErrors.nickname = "닉네임을 입력해주세요";
        if (!formData.password) formErrors.password = "비밀번호를 입력해주세요";
        if (formData.password !== formData.confirmPassword)
            formErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
        if (!formData.email) formErrors.email = "이메일을 입력해주세요";
        if (!formData.phone) formErrors.phone = "핸드폰 번호를 입력해주세요";
        if (!formData.address) formErrors.address = "주소를 입력해주세요";
        if (!formData.zonecode) formErrors.zonecode = "우편번호를 입력해주세요";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const completeHandler = (data) => {
        const { address, zonecode } = data;
        setFormData({ ...formData, address, zonecode });
        setIsOpen(false); // 팝업 닫기
    };

    const toggleHandler = () => {
        setIsOpen((prevOpenState) => !prevOpenState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await postSignupApi(formData, (response) => {
                if (response.status === 200) {
                    alert("Signup successful!");
                    setFormData({
                        userId: "",
                        name: "",
                        birthDate: "",
                        nickname: "",
                        password: "",
                        confirmPassword: "",
                        email: "",
                        phone: "",
                        address: "",
                        detailAddress: "",
                        zonecode: "",
                    });
                    navigate("/welcome");
                } else {
                    alert("Failed to sign up. Please try again.");
                }
            });
        } catch (error) {
            console.error("Signup error:", error);
            alert("An unexpected error occurred.");
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>회원가입</h2>

                <div>
                    <label>아이디: </label>
                    <input
                        type="text"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                    />
                    {errors.userId && <p style={{color: "red"}}>{errors.userId}</p>}
                </div>

                <div>
                    <label>비밀번호: </label>
                       <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          />
                          {errors.password && <p style={{color: "red"}}>{errors.password}</p>}
                </div>

                <div>
                    <label>비밀번호확인: </label>
                       <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                       />
                       {errors.confirmPassword && <p style={{color: "red"}}>{errors.confirmPassword}</p>}
                </div>

                <div>
                    <label>이름: </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.username && <p style={{color: "red"}}>{errors.name}</p>}
                </div>

                <div>
                    <label>생년월일: </label>
                    <input
                        type="Date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                    />
                    {errors.username && <p style={{color: "red"}}>{errors.birthDate}</p>}
                </div>

                <div>
                    <label>닉네임: </label>
                    <input
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                    />
                    {errors.nickname && <p style={{color: "red"}}>{errors.nickname}</p>}
                </div>

                <div>
                    <label>핸드폰: </label>
                    <input
                       type="text"
                       name="phone"
                       value={formData.phone}
                       onChange={handleChange}
                    />
                    {errors.phone && <p style={{color: "red"}}>{errors.phone}</p>}
                </div>

                <div>
                    <label>이메일: </label>
                    <input
                       type="email"
                       name="email"
                       value={formData.email}
                       onChange={handleChange}
                       />
                    {errors.phone && <p style={{color: "red"}}>{errors.email}</p>}
                </div>

                <div>
                    <label>우편번호: </label>
                    <div>
                        <input
                            type="text"
                            name="zonecode"
                            value={formData.zonecode}
                            readOnly
                        />
                        <button type="button" onClick={toggleHandler}>
                            주소 찾기
                        </button>
                    </div>
                    {errors.zonecode && <p style={{color: "red"}}>{errors.zonecode}</p>}
                </div>

                <div>
                    <label>주소: </label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        readOnly
                    />
                    {errors.address && <p style={{color: "red"}}>{errors.address}</p>}
                </div>

                <div>
                    <label>상세주소: </label>
                    <input
                        type="text"
                        name="detailAddress"
                        value={formData.detailAddress}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">가입하기</button>
                <button type="button" onClick={handleCancel}>취소</button>
            </form>

            {/* Modal 팝업 */}
            <AddressModal isOpen={isOpen} onClose={() => setIsOpen(false)} onComplete={completeHandler}/>
        </div>
    );
};

export default SignupComponent;