import AsyncStorage from '@react-native-community/async-storage';

const setToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    //console.log('error');
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token !== null) {
      return token;
    }
  } catch (error) {
    //console.log('error');
  }
};

const clearToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (e) {
    //console.log(e);
  }
};

const setUserName = async (user) => {
  try {
    await AsyncStorage.setItem('userName', user);
  } catch (error) {
    //console.log('error');
  }
};

const getUserName = async () => {
  try {
    const user = await AsyncStorage.getItem('userName');
    if (user !== null) {
      return user;
    }
  } catch (error) {
    //console.log('error');
  }
};

const clearUserName = async () => {
  try {
    await AsyncStorage.removeItem('userName');
  } catch (e) {
    //console.log(e);
  }
};

export {
  setToken,
  getToken,
  clearToken,
  setUserName,
  getUserName,
  clearUserName,
};
