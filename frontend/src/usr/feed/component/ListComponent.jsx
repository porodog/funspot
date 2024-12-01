import ProfileComponent from "./item/ProfileComponent";
import ImageComponent from "./item/ImageComponent";
import ButtonComponent from "./item/ButtonComponent";
import ContentComponent from "./item/ContentComponent";

const ListComponent = ({handleSelectedFeed, isLogin, feedList}) => {

    return (
        <div className="border-2 border-green-200 w-full">
            <h1>Feed List Component</h1>
            {(feedList ?? []).length > 0 ? (
                feedList.map((feed) => (
                    <div
                        key={feed.idx}
                        className="border border-blue-500 rounded-lg h-1/12 py-4"
                    >
                        <div className="flex flex-wrap pl-3 pb-3">
                            <ProfileComponent user={feed.user}/>
                        </div>

                        <div className="flex">
                            <div className="w-full relative">
                                {feed.feedImages.length > 0 && (
                                    <ImageComponent handleSelectedFeed={handleSelectedFeed}
                                                    feedImages={feed.feedImages}
                                                    feedIdx={feed.idx}
                                    />
                                )}
                            </div>
                        </div>

                        <ButtonComponent handleSelectedFeed={handleSelectedFeed} feed={feed} isLogin={isLogin}/>
                        <ContentComponent feed={feed}/>
                    </div>
                ))
            ) : (
                <div>NO Data</div>
            )}
        </div>
    );
};

export default ListComponent;
