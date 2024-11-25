import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_ROOT;

export const getTestApi = async(param) => {
    const response = axios.get(`${API_BASE_URL}/api/sample/hello`)
    return response.data;
}

export const postRefreshApi = async() => {
    const config = {
        withCredentials: true,
    };
    const response = axios.post(`${API_BASE_URL}/api/sample/refresh`, null, config);
    return response.data;
}


// const getRefreshToken = () => {
//     axios.post(`${API_BASE_URL}/api/sample/refresh`, null,{
//         withCredentials: true,
//     })
//         .then((response) => {
//             const data = response.data;
//             console.log(data);
//             localStorage.setItem('access_token', data.accessToken);
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }