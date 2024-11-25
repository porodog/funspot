import React from 'react';
import {postLoginApi} from "../api/LoginApi";
import {useNavigate} from "react-router-dom";

const LoginComponent = () => {
    const [userId, setUserId] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigate = useNavigate();

    const doLogin = () => {
        const formData = new FormData(document.querySelector("#login-form"));

        postLoginApi(formData, (result) => {
            if(result.status !== 200) {
                window.alert("login failed");
                return;
            }

            localStorage.setItem("access_token", result.data.accessToken);
            navigate({pathname: "/"}, {replace: true});
        });
    }

    return (
        <div>
            <form id="login-form">
                <input type="text" name="userId" value={userId} placeholder="ID" onChange={(e) => setUserId(e.target.value)} />
                <br/>
                <input type="password" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <br/>
                <button type="button" onClick={doLogin}>Login</button>
            </form>
        </div>
    );
};

export default LoginComponent;