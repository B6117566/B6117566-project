import Axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const axiosConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
};
const axios = Axios.create(axiosConfig);

async function getOrdersByUserId(user_id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`order/user/${user_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function insertOrder(body) {
  return new Promise((resolve, reject) => {
    axios
      .post(`order`, body)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { getOrdersByUserId, insertOrder };
