import React, { useCallback, useEffect, useState } from "react";
import { API_BASE_URL, getFeedListApi } from "../api/FeedApi";
import ProfileComponent from "./item/ProfileComponent";
import ImageComponent from "./item/ImageComponent";
import ButtonComponent from "./item/ButtonComponent";
import ContentComponent from "./item/ContentComponent";
import {useCheckToken} from "../../../common/hook/useCheckToken";

// 이미지 초기정보
const noImageSrc = `${API_BASE_URL}/api/usr/feed/image/no_image.jpg`;

const ListComponent = ({ openDetailModal }) => {

  const [loading, setLoading] = useState(false);
  const [feedList, setFeedList] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isBottom, setIsBottom] = useState(false);

  // 로그인
  const [isLogin, setIsLogin] = useState(false);
  const {checkToken} = useCheckToken();
  const checkLoginToken = async () => {
    const result = await checkToken();
    console.log("isLogin >> "+result);
    setIsLogin(isLogin);
  };

  // 스크롤 위치
  const botScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const innerHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + innerHeight >= scrollHeight - 1) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  // 데이터 처리
  const getList = useCallback(() => {
    if (!hasNext || loading) {
      return;
    }

    setLoading(true);

    const param = { lastId: lastId, pageSize: 1 };
    getFeedListApi(param)
      .then((data) => {
        const { feedDTOS, hasNext } = data;
        setFeedList((prevList) => [...prevList, ...feedDTOS]);
        setHasNext(hasNext);
        if (feedDTOS.length > 0) {
          setLastId(parseInt(feedDTOS[feedDTOS.length - 1].idx));
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [lastId, hasNext, loading]);

  // 최초 마운트
  useEffect(() => {
    checkLoginToken();
    getList();

    window.addEventListener("scroll", botScroll);
    // window.addEventListener("resize", botScroll);

    return () => {
      window.removeEventListener("scroll", botScroll);
      // window.removeEventListener("resize", botScroll);
    };
  }, []);

  // 스크롤 감지, 데이터 조회 감지
  useEffect(() => {
    if (isBottom && hasNext) {
      checkLoginToken();
      getList();
      setIsBottom(false);
    }
  }, [isBottom]);

  return (
    <div className="bg-green-100">
      <h1>Feed List Component</h1>
      {feedList && feedList.length > 0 ? (
        feedList.map((feed) => (
            <div
                key={feed.idx}
                className="border border-blue-500 rounded-lg w-2/5 h-1/12 py-4"
            >
              <div className="flex flex-wrap pl-3 pb-3">
                <ProfileComponent user={feed.user}/>
              </div>

              <div className="flex">
                <div className="w-full relative">
              {feed.feedImages.length > 0 && (
                  <ImageComponent feedImages={feed.feedImages} feedIdx={feed.idx} openDetailModal={openDetailModal}/>
              )}
                </div>
              </div>

              <ButtonComponent feed={feed} openDetailModal={openDetailModal}/>
              <ContentComponent feed={feed}/>
            </div>
        ))
      ) : (
        <div>NO Data</div>
      )}
      {loading && <h1>Loading more...</h1>}
    </div>
  );
};

export default ListComponent;
