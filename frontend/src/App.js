import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_ROOT;

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/sample/hello`)
        .then((response) => {
          setMessage(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        })
  }, []);

  const doLogin = () => {
      const formData = new FormData();
      formData.append("userId", "user001");
      formData.append("password", "1234");

      axios.post(`${API_BASE_URL}/api/sample/login`, formData, {
          withCredentials: true,
      })
          .then((response) => {
              const data = response.data;
              console.log(data);
              localStorage.setItem('access_token', data.accessToken);
          })
          .catch((error) => {
              console.log(error);
          });
  }

  const getRefreshToken = () => {
      axios.post(`${API_BASE_URL}/api/sample/refresh`, null,{
            withCredentials: true,
      })
          .then((response) => {
              const data = response.data;
              console.log(data);
              localStorage.setItem('access_token', data.accessToken);
          })
          .catch((error) => {
              console.log(error);
          })
  }

  return (
    <div className="App">
        <header className="App-header">
            <div>
                <button onClick={doLogin}>로그인</button>
                <button onClick={getRefreshToken}>리프레시 토큰</button>
            </div>
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <p>
                A message from Spring Boot..123 : <code>{message}</code>
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </header>

    </div>
  );
}

export default App;
