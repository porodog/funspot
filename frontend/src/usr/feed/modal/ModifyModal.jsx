import { useEffect, useRef, useState } from "react";
import HashTagModal from "./HashTagModal";
import ProfileComponent from "../component/item/ProfileComponent";
import ContentComponent from "../component/modify/ContentComponent";
import HashtagComponent from "../component/item/HashtagComponent";
import ImageComponent from "../component/modify/ImageComponent";
import { API_BASE_URL, putFeedModifyApi } from "../api/FeedApi";

const ModifyModal = ({ feed, closeModifyModal }) => {
  // 이미지
  const useFileRef = useRef([]);
  const [imgList, setImgList] = useState([]);
  const [delImgList, setDelImgList] = useState([]);
  const handleDeleteOriginImageIdx = (idx) => {
    setDelImgList((prevList) => {
      if (prevList.find((item) => item === idx)) {
        return [...prevList];
      }
      return [...prevList, idx];
    });
  };

  // 콘텐츠
  const useTextRef = useRef(null);

  // 해시태그 모달
  const [isHashtagModalOpen, setIsHashtagModalOpen] = useState(false);
  const closeHashtagModal = () => {
    setIsHashtagModalOpen(false);
  };

  // 해시태그 이벤트
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

  // 수정 등록
  const handleFeedSubmit = () => {
    const confirm = window.confirm("[피드수정] 저장 하시겠습니까?");
    if (!confirm) {
      return;
    }

const content = useTextRef.current.value;
    if (content.trim().length < 1) {
      window.alert("[피드수정] 내용을 입력해주세요");
      return false;
    }

    const form = new FormData();

    let cnt = imgList.length;
    useFileRef.current.forEach((item) => {
      const itemFile = item.files[0];
      if (itemFile) {
        form.append("uploadFiles", itemFile);
        cnt++;
      }
    });
    delImgList.forEach((item) => {
      if (item) {
        form.append("deleteFiles", item);
        cnt--;
      }
    });

    if(cnt===0) {
        window.alert("[피드수정] 이미지를 첨부해주세요");
      return false;
    }

    form.append("content", content);

    hashtagList.map((item, index) =>
      form.append(
        `feedHashtags[${index}].hashtagIdx`,
        parseInt(item.hashtagIdx)
      )
    );

    form.append("idx", feed.idx);

    putFeedModifyApi(form)
      .then((data) => {
        if (data) {
          window.alert("[피드수정] 저장을 성공했습니다");
          closeModifyModal(data);
          return;
        }
      })
      .catch((err) => {
        window.alert("[피드수정] 저장을 실패했습니다");
        console.log(err);
      });
  };

  useEffect(() => {
    const getImgList = feed.feedImages.map((item) => {
      return {
        ...item,
        imgSrc: `${API_BASE_URL}/api/usr/feed/image/${item.uploadName}`,
      };
    });
    setImgList([...getImgList]);
    setHashtagList([...feed.feedHashtags]);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-w-4xl p-6 relative space-y-4">
        <div className="flex justify-between items-center mb-4">
          {/* 상단영역: 프로필 정보 */}
          <ProfileComponent feedUserInfo={feed.user} pageType={"modify"} />

          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={() => closeModifyModal(null)}
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
              저장
            </button>
          </div>
        </div>

        {/* 중간영역: 글 내용 및 해시태그 */}
        <div className="w-full space-y-4">
          {/* 컨텐츠 */}
          <ContentComponent useTextRef={useTextRef} feed={feed} />

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
            img={imgList[0]}
            handleDeleteOriginImageIdx={handleDeleteOriginImageIdx}
          />
          <ImageComponent
            id={"upload2"}
            useFileRef={(e) => (useFileRef.current[1] = e)}
            img={imgList[1]}
            handleDeleteOriginImageIdx={handleDeleteOriginImageIdx}
          />
          <ImageComponent
            id={"upload3"}
            useFileRef={(e) => (useFileRef.current[2] = e)}
            img={imgList[2]}
            handleDeleteOriginImageIdx={handleDeleteOriginImageIdx}
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

export default ModifyModal;
