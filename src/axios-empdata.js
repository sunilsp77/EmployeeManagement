import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-employeedata.firebaseio.com/',
});

export default instance;
