import React, { useState, useEffect } from "react";
import BasicLayout from "../../../common/layout/BasicLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useBasic } from "../../../common/context/BasicContext";

export const API_BASE_URL = process.env.REACT_APP_API_ROOT;
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

const AddCoursePage = () => {
  const { userInfo } = useBasic();
  const navigate = useNavigate();

  // State 관리
  const [places, setPlaces] = useState([]); // 장소 목록
  const [selectedPlaces, setSelectedPlaces] = useState([]); // 선택된 장소 ID
  const [name, setName] = useState(""); // 코스 이름
  const [description, setDescription] = useState(""); // 코스 설명
  const [ageGroup, setAgeGroup] = useState("10대"); // 연령대
  const [fixed, setFixed] = useState(false); // 고정 여부
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [selectedLocation, setSelectedLocation] = useState("");

  // 장소 목록 불러오기
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("/api/usr/places");
        setPlaces(response.data);
      } catch (err) {
        console.error("장소 데이터를 불러오는 중 오류 발생:", err.message);
        alert("장소 데이터를 불러올 수 없습니다.");
      }
    };

    fetchPlaces();
  }, []);

  // 장소 선택 핸들러
  const handlePlaceSelection = (id) => {
    setSelectedPlaces((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // 코스 저장
  const saveCourse = async () => {
    if (selectedPlaces.length < 2) {
      alert("장소는 최소 2개를 선택해야 합니다.");
      return;
    }


    const newCourse = {
      name,
      ageGroup,
      description,
      fixed,
      places: selectedPlaces.map((placeId) => {
        const place = places.find((p) => p.id === placeId);
        return {
          id: place.id,
          name: place.name,
          description: place.description,
          latitude: place.latitude,
          longitude: place.longitude,
          location: place.location,
          cost: place.cost,
          time: place.time,
        };
      }),
    };

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/usr/course/addcourse`, newCourse);
      console.log("응답 데이터:", response.data);
      alert("코스가 성공적으로 추가되었습니다!");
      navigate("/datecourses");
    } catch (err) {
      alert("코스 저장에 실패했습니다.");
      console.error("코스 저장 실패:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
    console.log("전송할 데이터:", newCourse);

  };

  // 저장 버튼 비활성화 조건
  const isSaveDisabled =
    !name || !description || selectedPlaces.length < 2;

  return (
    <BasicLayout>
      {userInfo && (
        <div className="container mx-auto px-6 py-10">
          {/* 타이틀 */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            ✨ 새로운 코스 추가
          </h2>
          <p className="text-center text-gray-500 mb-8">
            코스의 이름, 설명, 연령대와 장소를 선택해주세요.
          </p>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* 코스 이름 */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                코스 이름
              </label>
              <input
                type="text"
                placeholder="코스 이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-cyan"
              />
            </div>

            {/* 코스 설명 */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                코스 설명
              </label>
              <textarea
                placeholder="코스에 대한 설명을 입력하세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-cyan"
              />
            </div>

            {/* 연령대 선택 */}
            <div className="mb-6">
              <span className="block text-gray-700 font-semibold mb-2">
                연령대
              </span>
              <div className="flex space-x-4">
                {["10대", "20대", "30대"].map((age) => (
                  <label
                    key={age}
                    className={`px-4 py-2 rounded-lg cursor-pointer ${ageGroup === age
                      ? "bg-custom-cyan text-white"
                      : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    <input
                      type="radio"
                      value={age}
                      checked={ageGroup === age}
                      onChange={() => setAgeGroup(age)}
                      className="hidden"
                    />
                    {age}
                  </label>
                ))}
              </div>
            </div>

            {/* 고정 여부 */}
            <div className="mb-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={fixed}
                  onChange={() => setFixed((prev) => !prev)}
                  className="h-5 w-5 text-custom-cyan"
                />
                <span className="ml-2 text-gray-700 font-semibold">
                  고정 여부
                </span>
              </label>
            </div>

            {/* 장소 위치 */}
            {/* <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                장소 위치
              </label>
              <input
                type="text"
                placeholder="장소 위치를 입력하세요"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}

            {/* 장소 선택 */}
            <div className="mb-6">
              <h3 className="text-gray-700 font-semibold mb-2">장소 선택 (최소 2개)</h3>

              {/* location 드롭다운 */}
              <div className="mb-4">
                <label htmlFor="locationSelect" className="block text-gray-700 font-medium mb-2">
                  지역 선택
                </label>
                <select
                  id="locationSelect"
                  className="w-full border rounded-lg p-2"
                  value={selectedLocation} // 선택된 location
                  onChange={(e) => setSelectedLocation(e.target.value)} // 선택 변경 시 업데이트
                >
                  <option value="">모든 지역</option>
                  {Array.from(new Set(places.map((place) => place.location))).map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* 장소 리스트 */}
              <div className="space-y-2">
                {Array.isArray(places) &&
                  places
                    .filter((place) => !selectedLocation || place.location === selectedLocation) // 선택된 location에 따라 필터링
                    .map((place) => (
                      <label
                        key={place.id}
                        className={`flex items-center p-2 rounded-lg border cursor-pointer ${selectedPlaces.includes(place.id)
                          ? "bg-blue-100 border-custom-cyan"
                          : "hover:bg-gray-100"
                          }`}
                      >
                        <input
                          type="checkbox"
                          onChange={() => handlePlaceSelection(place.id)}
                          checked={selectedPlaces.includes(place.id)}
                          className="h-5 w-5"
                        />
                        <span className="ml-3 text-gray-700">{place.name}</span>
                      </label>
                    ))}
              </div>
            </div>



            {/* 저장 버튼 */}
            <button
              onClick={saveCourse}
              disabled={isSaveDisabled || loading}
              className={`w-full py-3 font-bold rounded-lg transition ${isSaveDisabled || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-custom-cyan text-white hover:bg-emerald-600"
                }`}
            >
              {loading ? "저장 중..." : "코스 저장 🚀"}
            </button>
          </div>
        </div>
      )}
    </BasicLayout>
  );
};

export default AddCoursePage;
