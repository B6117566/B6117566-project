import Axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const axiosConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
};
const axios = Axios.create(axiosConfig);

async function getUserRoleOfUser() {
  return new Promise((resolve, reject) => {
    axios
      .get('userrole/position/user')
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
}

async function findUserRoleById(userRole_id) {
  return new Promise((resolve, reject) => {
    axios
      .post(`userrole/position`, {userRole_id})
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
}

async function checkExpiresAuthorization(body) {
  return new Promise((resolve, reject) => {
    axios
      .post(`auth`, body)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject();
      });
  });
}

export { getUserRoleOfUser, findUserRoleById, checkExpiresAuthorization };
