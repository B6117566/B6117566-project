import Axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const axiosConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
};
const axios = Axios.create(axiosConfig);

async function getAddressByProvinceId(province_id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`address/province/${province_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { getAddressByProvinceId };
