import axios from 'axios';
import { LOGIN, SIGNUP, SONG_SEARCH } from './const/ApiConsts';
import idx from 'idx';
import { getToken } from './utils/StorageUtils';

const login = async (data) => {
  return axios
    .post(LOGIN, data)
    .then((res) => {
      return {
        ...res.data,
        status: res.status,
      };
    })
    .catch((error) => {
      const eData = idx(error, (_) => _.response.data) || defaultError;
      return eData;
    });
};

const register = async (data) => {
  return axios
    .post(SIGNUP, data)
    .then((res) => {
      return {
        ...res.data,
        status: res.status,
      };
    })
    .catch((error) => {
      const eData = idx(error, (_) => _.response.data) || defaultError;
      return eData;
    });
};

const songSearchApi = async (data) => {
  const token = await getToken();
  return axios
    .post(SONG_SEARCH, data, {
      headers: {
        'x-access-token': token,
      },
    })
    .then((res) => {
      return {
        ...res.data,
        status: res.status,
      };
    })
    .catch((error) => {
      const data = idx(error, (_) => _.response.data) || defaultError;
      return data;
    });
};

export { login, songSearchApi, register };
