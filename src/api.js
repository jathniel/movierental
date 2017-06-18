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
export const rentMovie = (movieId, quantity) => {
  return axios.post('/api/rent', {movieId, quantity})
              .then(resp => resp.data);
};
export const deleteCast = (castId) => {
  return axios.delete(`/api/cast/${castId}`)
              .then(resp => resp.data);
};
export const addMovie = (form) => {
  return axios.post('/api/movies/add', {form})
              .then(resp => resp.data);
};
export const deleteMovie = (id) => {
  return axios.delete(`/api/movies/${id}`)
              .then(resp => resp.data);
};
export const updateMovie = (id, form) => {
  return axios.put(`/api/movies/${id}`, {form})
              .then(resp => resp.data);
};
export const uploadFile = (file) => {
  return axios.post('/api/files', file)
              .then(resp => resp.data);
};
export const getMovieRating = (id) => {
  return axios.get(`/api/movies/${id}/rating`)
              .then(resp => resp.data);
};
export const rateMovie = (id,form) => {
  return axios.post(`/api/movies/${id}/rating`, form)
              .then(resp => resp.data);
};
