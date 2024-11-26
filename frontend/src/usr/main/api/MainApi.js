import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_ROOT;

export const getHelloApi = async(callback) => {
    await axios.get(`${API_BASE_URL}/api/usr/main/hello`)
                .then(res => {
                    return callback({status: res.status, data: res.data});
                })
                .catch(err => {
                    console.log(err);
                    return callback({status: err.status, data: null});
                });
}