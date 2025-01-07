import { useEffect, useRef, useState } from "react";
import HashTagModal from "./HashTagModal";
import { postFeedInsertApi } from "../api/FeedApi";
import ImageComponent from "../component/insert/ImageComponent";
import ProfileComponent from "../component/item/ProfileComponent";
import { useBasic } from "../../../common/context/BasicContext";
import ContentComponent from "../component/insert/ContentComponent";
import HashtagComponent from "../component/item/HashtagComponent";
import { getProfileApi } from "../../mypage/api/MypageApi";

const InsertModal = ({ closeInsertModal }) => {
  const { userInfo } = useBasic();
  const loginUserIdx = userInfo?.userIdx || "";

  // 이미지
  const useFileRef = useRef([]);

  // 콘텐츠
  const useTextRef = useRef(null);

  // 해시태그 모달
  const [isHashtagModalOpen, setIsHashtagModalOpen] = useState(false);
  const closeHashtagModal = () => {
    setIsHashtagModalOpen(false);
  };

  // 해시태그 추가
  const [hashtagList, setHashtagList] = useState([]);
  const handleSelectHashTagEvent = (tag) => {
    const tagObj = {
      hashtagIdx: tag.idx,
      tagName: tag.tagName,
    };
    setHashtagList((prevList) => {
      if (prevList.find((item) => item.hashtagIdx === tagObj.hashtagIdx)) {
        return prevList.filter((item) => item.hashtagIdx !== tagObj.hashtagIdx);
      } else {
        return [...prevList, tagObj];
      }
    });
  };

  // 해시태그 삭제
  const handleDeleteHashTagEvent = (tag) => {
    setHashtagList((prevList) => {
      return prevList.filter((item) => item.hashtagIdx !== tag.hashtagIdx);
    });
  };

  // 글 등록
  const handleFeedSubmit = () => {


    const confirm = window.confirm("[피드등록] 등록 하시겠습니까?");
    if (!confirm) {
      return;
    }

const content = useTextRef.current.value;
    if (content.trim().length < 1) {
      window.alert("[피드등록] 컨텐츠 내용을 입력해주세요");
      return false;
    }

    const form = new FormData();

    let cnt = 0;
    useFileRef.current.forEach((item) => {
      const itemFile = item.files[0];
      if (itemFile) {
        form.append("uploadFiles", itemFile);
        cnt++;
      }
    });

    if(cnt===0) {
        window.alert("[피드등록] 이미지를 첨부해주세요");
      return false;
    }

    form.append("content", content);

    hashtagList.map((item, index) =>
      form.append(
        `feedHashtags[${index}].hashtagIdx`,
        parseInt(item.hashtagIdx)
      )
    );

    postFeedInsertApi(form)
      .then((data) => {
        if (data) {
          window.alert("[피드등록] 등록을 성공했습니다");
          closeInsertModal(data);
          return;
        }
      })
      .catch((err) => {
        window.alert("[피드등록] 등록을 실패했습니다");
        console.log(err);
      });
  };

  // 프로필정보
  const [feedUserInfo, setFeedUserInfo] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await getProfileApi({ userIdx: loginUserIdx });
        setFeedUserInfo(data);
      } catch (err) {
        window.alert("[프로필정보] 조회를 실패했습니다");
        console.log(err);
      }
    };
    getProfile();
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-w-4xl p-6 relative space-y-4">
        <div className="flex justify-between items-center mb-4">
          {/* 상단영역: 프로필 정보 */}
          <ProfileComponent feedUserInfo={feedUserInfo} pageType={"insert"} />

          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={() => closeInsertModal(null)}
              className="py-4 px-6 border-2 border-gray-400 bg-white 
              text-gray-400 font-semibold text-sm rounded-full
              hover:bg-gray-50"
            >
              취소
            </button>
            <button
              onClick={handleFeedSubmit}
              className="py-4 px-6 bg-emerald-400 
              text-white font-semibold text-sm rounded-full
              hover:bg-emerald-500"
            >
              등록
            </button>
          </div>
        </div>

        {/* 중간영역: 글 내용 및 해시태그 */}
        <div className="w-full space-y-4">
          {/* 컨텐츠 */}
          <ContentComponent useTextRef={useTextRef} />

          {/* 해시태그 */}
          <div className="flex space-x-4">
            <button
              className="py-4 px-6 w-42 max-h-14 border-2 border-emerald-400
              text-emerald-400 font-semibold text-sm rounded-full 
              hover:bg-emerald-400 hover:text-white transition duration-300 ease-in-out"
              onClick={() => setIsHashtagModalOpen(true)}
            >
              해시태그 추가
            </button>

            {/* 선택된 해시태그들 */}
            <div className="flex flex-wrap space-x-3 w-9/12">
              {(hashtagList ?? []).length > 0 && (
                <HashtagComponent
                  hashtagList={hashtagList}
                  handleDeleteHashTagEvent={handleDeleteHashTagEvent}
                />
              )}
            </div>
          </div>
        </div>

        {/* 하단영역: 이미지 업로드 */}
        <div className="flex justify-center space-x-8">
          <ImageComponent
            id={"upload1"}
            useFileRef={(e) => (useFileRef.current[0] = e)}
          />
          <ImageComponent
            id={"upload2"}
            useFileRef={(e) => (useFileRef.current[1] = e)}
          />
          <ImageComponent
            id={"upload3"}
            useFileRef={(e) => (useFileRef.current[2] = e)}
          />
        </div>

        {/* 해시태그 모달 */}
        {isHashtagModalOpen && (
          <HashTagModal
            closeHashtagModal={closeHashtagModal}
            hashtagList={hashtagList}
            handleSelectHashTagEvent={handleSelectHashTagEvent}
          />
        )}
      </div>
    </div>
  );
};

export default InsertModal;
