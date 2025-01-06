import React, { useEffect, useState } from "react";
import { searchPlaces, updateCustom, getCustomDetail } from "../api/CustomApi";
import { useParams, useNavigate } from "react-router-dom";
import { useBasic } from "../../../common/context/BasicContext";
import regions from "../data/regions";
import locate from "../img/locate.png";

const WITH_TAGS = [
  "연인과",
  "가족과",
  "친구와",
  "나홀로",
  "반려동물과",
  "아이와",
  "부모님과",
];

const DO_TAGS = [
  "놀러가기",
  "데이트",
  "맛집탐방",
  "소개팅",
  "기념일",
  "핫플탐방",
  "힐링",
  "쇼핑",
  "여행",
  "액티비티",
  "공연/전시",
];

const UpdateComponent = () => {
  const { cno } = useParams(); // URL에서 cno를 가져옴
  const navigate = useNavigate(); // 수정 후 페이지 이동
  const [currentStep, setCurrentStep] = useState(1);
  const [address, setAddress] = useState(""); // 검색할 주소
  const [name, setName] = useState(""); // 검색할 장소이름
  const [places, setPlaces] = useState([]); // 검색 결과
  const [selectedPlaces, setSelectedPlaces] = useState([]); // 선택한 장소
  const [title, setTitle] = useState(""); // 데이트 코스 제목
  const [description, setDescription] = useState(""); // 데이트 코스 설명
  const [selectedTags, setSelectedTags] = useState([]); // 태그
  const [loading, setLoading] = useState(true); // 로딩 상태

  const selectedCity = address.split(" ")[0];
  const selectedDistrict = address.split(" ")[1] || "";
  const districts = selectedCity ? regions[selectedCity] : [];
  const { userInfo } = useBasic();

  const loginNickName = userInfo?.nickname || "";

  // 수정할 데이터 가져오기
  useEffect(() => {
    const fetchCustomDetail = async () => {
      try {
        const data = await getCustomDetail(cno); // API 호출로 기존 데이터 가져오기
        setTitle(data.title);
        setDescription(data.description);
        setSelectedTags(data.tags);
        setSelectedPlaces(data.places); // 기존 장소 설정
      } catch (error) {
        console.error("Error fetching custom detail:", error);
        alert("Failed to load the date course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomDetail();
  }, [cno]);

  // 🔥 단계 변경 핸들러
  const handleNextStep = () => {
    if (currentStep === 1 && selectedPlaces.length < 2) {
      alert("장소를 최소 2개 이상 선택해야 합니다.");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // 주소로 장소 검색
  const handleSearch = async () => {
    try {
      const data = await searchPlaces(address, name); // 🔥 주소로 장소 검색
      // 🔥 이미 선택된 장소는 제외하는 필터 추가
      const filteredData = data.filter(
        (place) => !selectedPlaces.some((selected) => selected.id === place.id)
      );
      setPlaces(filteredData); // 선택된 장소가 제외된 목록만 추가
    } catch (error) {
      console.error("Error fetching places:", error);
      alert("Failed to fetch places. Please try again.");
    }
  };

  // 장소 선택
  // 장소 추가
  const handleAddPlace = (place) => {
    if (selectedPlaces.length >= 5) {
      alert("최대 5개의 장소만 추가할 수 있습니다.");
      return;
    }
    setSelectedPlaces([...selectedPlaces, place]); // 선택된 장소에 추가
    setPlaces(places.filter((p) => p.id !== place.id)); // 장소 목록에서 제거
  };

  // 장소 삭제
  const handleRemovePlace = (place) => {
    // 선택된 장소에서 제거
    setSelectedPlaces(selectedPlaces.filter((p) => p.id !== place.id));
  };

  // 태그 선택/해제 핸들러
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 데이트 코스 수정
  const handleUpdate = async () => {
    if (!title || !description || selectedPlaces.length < 2) {
      alert("모든 입력사항을 채우고, 장소를 최소한 2곳을 선택하여 주십시오.");
      return;
    }

    const course = {
      title,
      description,
      places: selectedPlaces,
      tags: selectedTags,
      nickname: loginNickName,
    };

    try {
      await updateCustom(cno, course); // 수정 API 호출
      alert("코스가 정상적으로 수정되었습니다.");
      navigate(`/custom/read/${cno}`); // 수정 후 상세 페이지로 이동
    } catch (error) {
      console.error("Error updating date course:", error);
      alert("코스 수정에 실패하였습니다. 다시 시도 하여 주십시오.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {currentStep === 1 && (
        <div>
          <div className="mb-2">
            {/* 제목 */}
            <h1 className="text-4xl font-bold text-center mb-2">
              데이트 코스 수정하기
            </h1>

            {/* 버튼 그룹 */}
            <div className="flex justify-between items-center">
              {/* 뒤로가기 버튼 */}
              <button
                onClick={() => navigate(`/custom/read/${cno}`)}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                뒤로가기
              </button>

              {/* 다음 단계로 버튼 */}
              <button
                onClick={handleNextStep}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                다음 단계로
              </button>
            </div>
          </div>
          <div className="mb-6">
            {/* 제목 */}
            <h3 className="text-xl font-bold mb-2">장소를 선택해주세요</h3>
            <p className="text-sm text-gray-600 mb-4">
              최대 5개까지 선택할 수 있습니다.
            </p>

            {/* 검색 입력 필드와 버튼 */}
            <div className="flex flex-col space-y-4 my-6">
              {/* 첫 번째 줄: 시/도 선택과 구/군 선택 */}
              <div className="flex items-center space-x-4">
                {/* 시/도 선택 */}
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">
                    지역을 선택해주세요.
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      setAddress(`${e.target.value} `); // 구/군 초기화
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-cyan"
                  >
                    <option value="">전체</option>
                    {Object.keys(regions).map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 구/군 선택 */}
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">
                    상세 지역을 선택해주세요.
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) =>
                      setAddress(`${selectedCity} ${e.target.value}`)
                    } // 시/도 + 구/군 조합
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-cyan"
                  >
                    <option value="">전체</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 두 번째 줄: 장소 이름 입력과 버튼 */}
              <div className="flex items-center space-x-4">
                {/* 장소 이름 입력 */}
                <div className="flex-grow">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="장소 이름을 입력해주세요."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-cyan"
                  />
                </div>

                {/* 검색 버튼 */}
                <button
                  className="px-8 py-3 bg-custom-cyan text-white rounded-xl hover:bg-emerald-500 transition duration-200 cursor-pointer"
                  onClick={handleSearch}
                >
                  검색
                </button>
              </div>
            </div>
          </div>

          {/* 선택된 장소 */}
          {selectedPlaces.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-4">선택된 장소</h3>
              <div className="flex gap-4 list-none p-0">
                {selectedPlaces.map((place) => (
                  <div
                    key={place.id}
                    className="relative flex flex-col items-center w-24"
                  >
                    {/* X 버튼 */}
                    <button
                      onClick={() => handleRemovePlace(place)}
                      className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-white text-gray-700 rounded-full shadow-md"
                    >
                      &times; {/* X 문자 */}
                    </button>

                    {/* 원형 이미지 */}
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 shadow-md"
                    />

                    {/* 장소 이름 */}
                    <p className="text-sm text-gray-800 font-medium mt-2 text-center truncate w-full">
                      {place.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 검색 결과 */}
          {places.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-2">검색 결과</h3>
              <div className="grid grid-cols-5 gap-4 list-none p-1">
                {places.map((place) => (
                  <div class="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
                    <div className="relative">
                      <img
                        src={place.image}
                        alt="user"
                        className="w-full h-40 object-cover"
                      />

                      {/* 좌측 상단 이미지와 텍스트 */}
                      <div className="absolute top-2 left-2 flex items-center bg-black/60 text-white px-2 py-1 rounded-md">
                        {/* 추가 이미지 */}
                        <img
                          src={locate} // 추가하려는 이미지 경로
                          alt="locate"
                          className="w-4 h-4 mr-1"
                        />
                        {/* 텍스트 */}
                        <span className="text-xs">{place.simpleAddress}</span>
                      </div>
                    </div>
                    <div class="p-4">
                      <h3 class="text-gray-800 text-lg font-bold mb-2">
                        {place.name}
                      </h3>
                      <button
                        onClick={() => handleAddPlace(place)}
                        className="w-full py-2 rounded-md text-sm font-bold bg-custom-cyan text-white hover:bg-custom-cyan/80 transition"
                      >
                        코스에 추가하기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {currentStep === 2 && (
        <div>
          {/* 데이트 코스 등록 */}
          <div>
            <h1 class="text-4xl font-bold text-center">데이트 코스 수정하기</h1>

            <div className="mb-4">
              <label className="block text-lg font-bold mb-2">
                코스 제목을 입력해주세요.
              </label>
              <div className="relative">
                <input
                  className="w-full border-b-2 border-custom-cyan text-lg text-gray-400 placeholder-gray-300 focus:outline-none focus:border-custom-cyan"
                  type="text"
                  placeholder={loginNickName + "님의 코스"}
                  maxLength="20"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="text-sm text-gray-400 mt-1">
                  ({title.length}/20)
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-lg font-bold mb-2">
                코스에 대해 설명해주세요.
              </label>
              <div className="relative">
                {/* 텍스트 에어리어 */}
                <textarea
                  className="w-full px-2 pb-1 text-gray-500 border-b-2 border-custom-cyan placeholder-gray-300 text-lg focus:outline-none focus:ring-0 focus:border-custom-cyan resize-none"
                  placeholder={loginNickName + "님의 코스입니다."}
                  rows="4"
                  maxLength={200}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {/* 글자 수 */}
                <p className="absolute left-0 bottom--1 text-gray-400 text-sm">
                  ({description.length}/200)
                </p>
              </div>
            </div>

            <div className="mb-8">
              <label className="block mb-4 text-lg font-bold">
                누구랑 가는 코스인가요?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {WITH_TAGS.map((tag) => (
                  <div key={tag}>
                    <input
                      type="checkbox"
                      value={tag}
                      checked={selectedTags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                      id={`checkbox-${tag}`}
                      className="peer hidden"
                    />
                    <label
                      htmlFor={`checkbox-${tag}`}
                      className=" peer-checked:text-custom-cyan peer-checked:border-custom-cyan text-gray-300 border border-gray-300 px-4 py-2 rounded-full cursor-pointer text-center block transition font-semibold"
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block mb-4 text-lg font-bold">
                무엇을 하러 가는 코스인가요?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {DO_TAGS.map((tag) => (
                  <div key={tag}>
                    <input
                      type="checkbox"
                      value={tag}
                      checked={selectedTags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                      id={`checkbox-${tag}`}
                      className="peer hidden"
                    />
                    <label
                      htmlFor={`checkbox-${tag}`}
                      className=" peer-checked:text-custom-cyan peer-checked:border-custom-cyan text-gray-300 border border-gray-300 px-4 py-2 rounded-full cursor-pointer text-center block transition font-semibold"
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={handlePreviousStep}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                이전 단계로
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                코스 수정하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateComponent;
