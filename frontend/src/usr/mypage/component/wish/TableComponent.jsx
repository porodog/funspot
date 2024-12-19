import React from "react";
import { useNavigate } from "react-router-dom";
import { removeWishList } from "../../../custom/api/WishListApi";
import { useBasic } from "../../../../common/context/BasicContext";

const TableComponent = ({ wishList, setWishList }) => {
  const { userInfo } = useBasic();
  const loginUserIdx = userInfo?.userIdx || "";

  const navigate = useNavigate();
  const handleDetailEvent = (cno) => {
    navigate(`/custom/read/${cno}`);
  };
  const handleDeleteButtonEvent = async (id, cno) => {
    try {
      const data = await removeWishList(loginUserIdx, cno);
      console.log(data);
      window.alert(data.data);
      if (data.status === 200) {
        setWishList((prevList) => prevList.filter((prev) => prev.id !== id));
      }
    } catch (err) {
      window.alert("[위시리스트 삭제] 삭제를 실패했습니다");
      console.log(err);
    }
  };

  return (
    <div className="w-full h-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-4 text-left text-gray-800 font-semibold">
              번호
            </th>
            <th className="px-6 py-4 text-left text-gray-800 font-semibold">
              타이틀
            </th>
            <th className="px-6 py-4 text-left text-gray-800 font-semibold">
              삭제
            </th>
          </tr>
        </thead>
        <tbody>
          {wishList &&
            wishList.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 w-full">
                <td className="w-1/6 px-6 py-4 text-gray-700">{index + 1}</td>
                <td
                  className="w-1/6 px-6 py-4 text-gray-700 cursor-pointer"
                  onClick={() => handleDetailEvent(item.customCno)}
                >
                  {item.title}
                </td>
                <td className="w-1/6 px-6 py-4">
                  <button
                    className="text-red-500 hover:text-red-600 hover:font-bold hover:scale-x-105 transition-all duration-200 ease-in-out"
                    onClick={() =>
                      handleDeleteButtonEvent(item.id, item.customCno)
                    }
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
