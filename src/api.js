import axios from 'axios';

export const checkLogin = (username, password) => {
  return axios.post('/api/login', {username, password})
              .then(resp => resp.data);
};
export const getMovieList = () => {
  return axios.get('/api/movies')
              .then(resp => resp.data);
};
export const getMovieDescription = (id) => {
  return axios.get(`/api/movies/${id}`)
              .then(resp => resp.data);
};
export const searchMovies = (search, limit) => {
  return axios.post('/api/movies', {search, limit})
              .then(resp => resp.data);
};
