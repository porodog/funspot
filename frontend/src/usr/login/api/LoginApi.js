import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_ROOT;

export const postLoginApi = async(param, callback) => {
    const config = {
        withCredentials: true
    };

    await axios.post(`${API_BASE_URL}/api/usr/login/login`, param, config)
                .then(res => {
                    return callback({status: res.status, data: res.data});
                })
                .catch(err => {
                    console.log(err);
                    return callback({status: err.status, data: null});
                });
}

