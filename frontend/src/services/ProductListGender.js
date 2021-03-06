import Axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const axiosConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
};
const axios = Axios.create(axiosConfig);

async function getGenders() {
  return new Promise((resolve, reject) => {
    axios
      .get('gender')
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function getCategorysByGenderId(gender_id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`category/gender/${gender_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function getProductsAllByGender(gender_id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`product/gender/${gender_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function getProductsAllByCategoryGender(category_id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`product/category/${category_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function findProductById(product_id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`product/${product_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function findProductsBySearch(s_product) {
  return new Promise((resolve, reject) => {
    axios
      .get(`product/search/${s_product}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function getStocksByProductId(product_id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`stock/product/${product_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function insertCart(body) {
  return new Promise((resolve, reject) => {
    axios
      .post(`cart`, body, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).token,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export {
  getGenders,
  getCategorysByGenderId,
  getProductsAllByGender,
  getProductsAllByCategoryGender,
  findProductById,
  findProductsBySearch,
  getStocksByProductId,
  insertCart,
};
