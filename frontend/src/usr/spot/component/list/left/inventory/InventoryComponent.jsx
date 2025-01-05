import ItemImageComponent from "./item/ItemImageComponent";
import ItemButtonComponent from "./item/ItemButtonComponent";
import ItemBookmarkComponent from "./item/ItemBookmarkComponent";
import ItemNameComponent from "./item/ItemNameComponent";

const InventoryComponent = ({
                                spot: { addr1, addr2, areacode, booktour, cat1, cat2, cat3, contentid,
                                    contenttypeid, createdtime, firstImage, firstImage2,
                                    cpyrhtDivCd, mapX, mapY, mlevel, modifiedtime, sigungucode,
                                    tel, title, bookmark, imageList },
                                setSpotSelected
                            }) => {
    return (
        <div className="w-full pb-4 pr-2 flex flex-col justify-start border-b-2 border-gray-200">
            {/* 상단 */}
            <div className="flex flex-col mb-2">
                {/* 명소이름 */}
                <ItemNameComponent
                    id={contentid}
                    name={title}
                    setSpotSelected={setSpotSelected}
                />
                {/* 주소와 전화번호 */}
                <div className="text-sm text-gray-600 mt-1">
                    <p className="truncate">{addr1}</p>
                    <p>{tel}</p>
                </div>
            </div>

            {/* 하단 */}
            <div className="w-full h-24 flex justify-start">
                {/* 이미지 */}
                <ItemImageComponent imageList={imageList} slideUnit={2} />

                <div className="w-2/5 h-full pl-3 relative flex content-end">
                    {/* 즐겨찾기 */}
                    {/*<ItemBookmarkComponent id={contentid} bookmark={bookmark} />*/}
                    {/* 담기 버튼 */}
                    <ItemButtonComponent id={contentid} spotData={{
                        addr1 : addr1,
                        addr2 : addr2,
                        areacode: areacode,
                        booktour: booktour,
                        cat1: cat1,
                        cat2: cat2,
                        cat3: cat3,
                        contentid: contentid,
                        contenttypeid: contenttypeid,
                        createdtime: createdtime,
                        firstImage: firstImage,
                        firstImage2: firstImage2,
                        cpyrhtDivCd: cpyrhtDivCd,
                        mapX: mapX,
                        mapY: mapY,
                        mlevel: mlevel,
                        modifiedtime: modifiedtime,
                        sigungucode: sigungucode,
                        tel: tel,
                        title: title

                        // contentid: id,
                        // // addr1: address,
                        // title: name,
                        // firstimage: imageList[0],
                        // firstimage2: imageList[1],
                        // tel: tel
                    }} />
                </div>
            </div>
        </div>
    );
};


// const InventoryComponent = ({
//                               spot: { id, name, address, tel, bookmark, imageList },
//                               setSpotSelected,
//                             }) => {
//   return (
//       <div className="w-full pb-4 pr-2 flex flex-col justify-start border-b-2 border-gray-200">
//         {/* 상단 */}
//         <div className="flex flex-col mb-2">
//           {/* 명소이름 */}
//           <ItemNameComponent
//               id={id}
//               name={name}
//               setSpotSelected={setSpotSelected}
//           />
//           {/* 주소와 전화번호 */}
//           <div className="text-sm text-gray-600 mt-1">
//             <p className="truncate">{address}</p>
//             <p>{tel}</p>
//           </div>
//         </div>
//
//         {/* 하단 */}
//         <div className="w-full h-24 flex justify-start">
//           {/* 이미지 */}
//           <ItemImageComponent imageList={imageList} slideUnit={2} />
//
//           <div className="w-2/5 h-full pl-3 relative flex content-end">
//             {/* 즐겨찾기 */}
//             <ItemBookmarkComponent id={id} bookmark={bookmark} />
//             {/* 담기 버튼 */}
//             <ItemButtonComponent id={id} />
//           </div>
//         </div>
//       </div>
//   );
// };

export default InventoryComponent;
