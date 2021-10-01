import Axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const axiosConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
};
const axios = Axios.create(axiosConfig);

async function getGenders() {
  return new Promise((resolve) => {
    axios
      .get('gender')
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

async function getCategorysByGenderId(gender_id) {
  return new Promise((resolve) => {
    axios
      .get(`category/gender/${gender_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

async function getProductsAllByGender(gender_id) {
  return new Promise((resolve) => {
    axios
      .get(`product/gender/${gender_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
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
  return new Promise((resolve) => {
    axios
      .get(`product/${product_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

async function getStocksByProductId(product_id) {
  return new Promise((resolve) => {
    axios
      .get(`stock/product/${product_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

async function insertCart(body) {
  return new Promise((resolve) => {
    axios
      .post(`cart`, body)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

export {
  getGenders,
  getCategorysByGenderId,
  getProductsAllByGender,
  getProductsAllByCategoryGender,
  findProductById,
  getStocksByProductId,
  insertCart,
};
