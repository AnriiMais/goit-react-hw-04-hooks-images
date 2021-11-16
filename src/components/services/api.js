import axios from 'axios';
// import PropTypes from 'prop-types';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = process.env.REACT_APP_API_KEY;

const setParams = params => {
  return (axios.defaults.params = { key: API_KEY, ...params });
};
export const getRequest = ({ query, page }) => {
  setParams({
    q: query,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });
  return axios
    .get()
    .then(res => {
      if (res.status >= 200 && res.status < 399) {
        return res.data;
      }
      return Promise.reject(new Error('Oops something wrong...'));
    })
    .catch(err => {
      throw err;
    });
};
