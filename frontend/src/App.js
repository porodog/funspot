import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_ROOT;

function App() {
    console.log(API_BASE_URL);
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

  return (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <p>
                A message from Spring Boot@@ : <code>{message}</code>
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
