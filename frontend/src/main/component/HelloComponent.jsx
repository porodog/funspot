import React, {useEffect} from 'react';
import {getHelloApi} from "../api/MainApi";

const HelloComponent = () => {
    const [hello, setHello] = React.useState('');

    useEffect(() => {
        getHelloApi((result) => {
            if(result.status !== 200) {
                setHello("api get failed");
            }
            console.log(result);
            setHello(result.data.message);
        });
    }, []);

    return (
        <div>
            API Hello API TEXT => {hello}
        </div>
    );
};


export default HelloComponent;