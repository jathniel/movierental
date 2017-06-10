import axios from 'axios';

export const checkLogin = (username, password) => {
  return axios.post('/api/login', {username, password})
              .then(resp => resp.data);
};
export const getMovieList = () => {
  return axios.get('/api/movies')
              .then(resp => resp.data);
};
