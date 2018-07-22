import axios from 'axios';

const instance = axios.create({
	baseURL : 'http://localhost:7000/v1/order'
});

export default instance;