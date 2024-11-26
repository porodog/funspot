import React, {useEffect} from 'react';
import {useCheckToken} from "../../../common/hook/useCheckToken";
import {getInfoApi} from "../api/MypageApi";

const MyPage = () => {
    const { checkToken } = useCheckToken();

    useEffect(() => {
        const init = async() => {
            await checkToken();

            getInfoApi()
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
        init();
    }, [checkToken]);

    return (
        <div>
            마이페이지
        </div>
    );
};

export default MyPage;