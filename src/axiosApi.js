import axios from 'axios';
import moment from 'moment';
import jwt_decode from 'jwt-decode';
import { API_HOST_URL } from './constants';

export const TokenManager = () => {
  const setAccessToken = token => {
    localStorage.setItem('access_token', token);
  };

  const setRefreshToken = token => {
    localStorage.setItem('refresh_token', token);
  };
  const setTokens = ({ access_token, refresh_token }) => {
    setAccessToken(access_token);
    setRefreshToken(refresh_token);
  };
  const thereIsTokens = () => {
    if (
      localStorage.getItem('access_token') &&
      localStorage.getItem('refresh_token')
    )
      return true;
    return false;
  };

  const getTokens = () => {
    let access_token = null;
    let refresh_token = null;
    if (thereIsTokens()) {
      try {
        access_token = localStorage.getItem('access_token');
        refresh_token = localStorage.getItem('refresh_token');
      } catch (error) {
        throw error;
      }
    }
    return { access_token: access_token, refresh_token: refresh_token };
  };
  const isAccessTokenExpired = () => {
    const { access_token } = getTokens();

    if (!thereIsTokens()) return true;
    const decoded_access_token = jwt_decode(access_token);
    return decoded_access_token.exp < moment().unix();
  };
  const isRefreshTokenExpired = () => {
    const { refresh_token } = getTokens();
    if (!thereIsTokens()) return true;
    const decoded_refresh_token = jwt_decode(refresh_token);
    return decoded_refresh_token.exp < moment().unix();
  };

  const areTokensExpired = () => {
    if (thereIsTokens())
      if (isAccessTokenExpired() && isRefreshTokenExpired()) return true;
      else {
        return false;
      }

    return true;
  };
  const removeTokens = () => {
    window.localStorage.clear();
  };
  return {
    setTokens,
    setAccessToken,
    setRefreshToken,
    getTokens,
    isRefreshTokenExpired,
    isAccessTokenExpired,
    areTokensExpired,
    removeTokens: removeTokens,
  };
};

const axiosAuth = axios.create({
  baseURL: API_HOST_URL,
  timeout: 10995000,
  headers: {
    Authorization: 'JWT ' + localStorage.getItem('access_token'),
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

axiosAuth.interceptors.request.use(async config => {
  // Decode available tokens
  let access_token = {};
  let refresh_token = {};
  if (
    localStorage.getItem('access_token') &&
    localStorage.getItem('refresh_token')
  ) {
    access_token = jwt_decode(localStorage.getItem('access_token'));
    refresh_token = jwt_decode(localStorage.getItem('refresh_token'));
  }
 
  // Update tokens if the access token is expired and a valid refresh token is available
  if (
    access_token.exp < moment().unix() &&
    refresh_token.exp > moment().unix()
  ) {
    
    const response = await axios.post(
      `${API_HOST_URL}/dj-rest-auth/token/refresh/`,
      {
        refresh: localStorage.getItem('refresh_token'),
      },
      {
        headers: {
          Authorization: 'JWT ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      }
    );
    localStorage.setItem('access_token', response.data.access);
    access_token = jwt_decode(response.data.access);
  }

  // Add access token to request
  if (access_token.exp > moment().unix()) {
    config.headers['Authorization'] =
      'Bearer ' + localStorage.getItem('access_token');
  }

  // Disconnect user if authentication tokens are expired
  // (Added to avoid unnecessary API calls)
  if (
    access_token.exp < moment().unix() &&
    refresh_token.exp < moment().unix()
  ) {
    localStorage.clear();
    window.location = '/login/';
  }

  return config;
});

axiosAuth.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        let tokenManager = TokenManager();
        if (tokenManager.thereIsTokens && tokenManager.areTokensExpired()) {
          window.localStorage.clear();
          window.location = '/login/';
        }
      } else if (error.response.status === 403) {
        window.location = '/login/';
      }
    }
    return Promise.reject(error.response);
  }
);

export const axiosAuthInstance = axiosAuth;
export const anonymousInstance = axios.create({
  baseURL: API_HOST_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});
