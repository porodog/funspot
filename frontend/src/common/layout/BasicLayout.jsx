import React from 'react';
import Header from "../component/Header";
import Footer from "../component/Footer";
import Aside from "../component/Aside";

const BasicLayout = ({children}) => {
    return (
        <div id="basic-layout">
            <Header/>
            <main id="basic-content">
                {children}
            </main>
            <Aside/>
            <Footer/>
        </div>
    );
};

export default BasicLayout;