import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.moonpay.io/v3'
});

export default instance;