import ProfileComponent from "./item/ProfileComponent";
import ImageComponent from "./item/ImageComponent";
import ButtonComponent from "./item/ButtonComponent";
import ContentComponent from "./item/ContentComponent";

const ListComponent = ({
  feedList,
  openDetailModal,
  handleLikesEvent,
  handleListDeleteEvent,
  openModifyModal,
}) => {
  return (
    <div className="w-full h-auto space-y-20">
      {(feedList ?? []).length > 0 ? (
        feedList.map((feed) => (
          <div
            key={feed.idx}
            className="w-full h-auto p-8 space-y-6 border-b-2 border-gray-100"
          >
            <ProfileComponent
              feedUserInfo={feed.user}
              pageType={"list"}
              handleListDeleteEvent={() => handleListDeleteEvent(feed.idx)}
              openModifyModal={() => openModifyModal(feed.idx)}
            />

            <div className="flex max-h-[800px]">
              <div className="w-full relative">
                {feed.feedImages.length > 0 && (
                  <ImageComponent
                    openDetailModal={() => openDetailModal(feed.idx)}
                    feedImages={feed.feedImages}
                  />
                )}
              </div>
            </div>

            <ButtonComponent
              feed={feed}
              openDetailModal={() => openDetailModal(feed.idx)}
              handleLikesEvent={handleLikesEvent}
            />
            <ContentComponent
              feed={feed}
              openDetailModal={() => openDetailModal(feed.idx)}
            />
          </div>
        ))
      ) : (
        <div>NO Data</div>
      )}
    </div>
  );
};

export default ListComponent;
