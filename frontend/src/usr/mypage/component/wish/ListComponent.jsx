import React, { useEffect, useState } from "react";
import { getWishList } from "../../../custom/api/WishListApi";
import { useBasic } from "../../../../common/context/BasicContext";
import TableComponent from "./TableComponent";
import { BiMessageAltDots } from "react-icons/bi";

const ListComponent = () => {
  const { userInfo } = useBasic();
  const loginUserIdx = userInfo?.userIdx || "";

  // 목록
  const [myWishList, setMyWishList] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [lastId, setLastId] = useState(0);
  const [loading, setLoading] = useState(false);

  const getList = async () => {
    try {
      setLoading(true);

      const data = await getWishList(loginUserIdx, {
        lastId: lastId,
        pageSize: 12,
      });
      if (data) {
        const { wishList, hasNext } = data;
        setMyWishList((prevList) => [...prevList, ...wishList]);
        setHasNext(hasNext);
        if (wishList.length > 0) {
          setLastId(parseInt(wishList[wishList.length - 1].id));
        }
      }
    } catch (err) {
      window.alert("[위시리스트 목록] 조회를 실패했습니다");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const [isBottom, setIsBottom] = useState(false);
  const handleScrollEvent = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const innerHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + innerHeight >= scrollHeight - 1) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    getList();
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  useEffect(() => {
    if (isBottom && hasNext && !loading) {
      getList();
    }
  }, [isBottom]);

  return (
    <>
      <div className="w-full h-auto mx-auto">
        {(myWishList ?? []).length > 0 ? (
          <TableComponent wishList={myWishList} setWishList={setMyWishList} />
        ) : (
          <>
            <div className="w-full h-full py-10 flex flex-col justify-center items-center text-gray-600 space-y-4">
              <BiMessageAltDots className="text-4xl" />
              <span className="font-semibold text-xl">
                등록된 정보가 없습니다
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ListComponent;
