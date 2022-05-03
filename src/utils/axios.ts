import axios from 'axios';

const axiosServices = axios.create({
  baseURL: `http://75.119.140.14:8082/api/v1/`
  // timeout: 1000
});

export default axiosServices;
