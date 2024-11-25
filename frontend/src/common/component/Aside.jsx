import React from 'react';
import {Link} from "react-router-dom";

const Aside = () => {
    return (
        <aside id="aside-component">
            사이드 메뉴영역
            <ul>
                <li>
                    <Link to={"/"}>메인</Link>
                </li>
                <li>
                    <Link to={"/login"}>로그인</Link>
                </li>
            </ul>
        </aside>
    );
};

export default Aside;