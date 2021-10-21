import Axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const axiosConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
};
const axios = Axios.create(axiosConfig);

async function getCartsByUserId(user_id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`cart/user/${user_id}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).token,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function deleteCart(cart_id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`cart/${cart_id}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).token,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function updateCartSomeField(cart_id, body) {
  return new Promise((resolve, reject) => {
    axios
      .patch(`cart/${cart_id}`, body, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).token,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export { getCartsByUserId, deleteCart, updateCartSomeField };
