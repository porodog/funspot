import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_SPOT_API_URL;
const API_ENCODED_URL = process.env.REACT_APP_SPOT_API_KEY_ENCODING;
const API_DECODED_URL = process.env.REACT_APP_SPOT_API_KEY_DECODING;

export const spotApi = {
    searchCity: async () => {
        const response = await axios.get(API_BASE_URL + API_ENCODED_URL);
        // const url = ""
    }

}