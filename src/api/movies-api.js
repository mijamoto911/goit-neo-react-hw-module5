import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const API_KEY = '0030e24502d1f4c65e4869a48134f73c';

export const fetchMovies = async () => {
  const { data } = await axios.get(`/movie/popular`, {
    params: {
      api_key: API_KEY,
    },
  });

  return data;
};

export const searchMovies = async (query) => {
  const { data } = await axios.get(`/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });
  return data;
};
export const fetchMovieInfo = async (movieId) => {
  const { data } = await axios(`/movie/${movieId})`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};

export const fetchCast = async (movieId) => {
  const { data } = await axios(`/movie/${movieId}/credits`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};

export const fetchReviews = async (movieId) => {
  const { data } = await axios(`/movie/${movieId}/reviews`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};
