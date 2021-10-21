import Axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const axiosConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
};
const axios = Axios.create(axiosConfig);

async function updateStockSomeField(stock_id, body) {
  return new Promise((resolve, reject) => {
    axios
      .patch(`stock/${stock_id}`, body, {
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
export { updateStockSomeField };
