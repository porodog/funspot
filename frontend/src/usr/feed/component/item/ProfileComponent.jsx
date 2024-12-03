import React from 'react';


const ProfileComponent = ({user}) => {
    const {idx, userId} = user;
    return (
        <>
            <div className="flex items-center space-x-4">
                {/* 프로필 */}
                <img
                    src=""
                    alt="프로필 이미지"
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <p className="font-semibold text-lg">{userId}</p>
                </div>
                {/*<div>
                    <p className="font-semibold text-lg">사용자 이름</p>
                    <p className="text-sm text-gray-500">@user_id</p>
                </div>*/}
            </div>
        </>
    );
};

export default ProfileComponent;