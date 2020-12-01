import React from 'react';
import axios from 'axios';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';
import Home from './src/screens/Home';
import User from './src/screens/User';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import SongLookUp from './src/screens/SongLookUp';
import {
  clearToken,
  getToken,
  setToken,
  clearUserName,
} from './src/utils/StorageUtils';
import NoInternetBar from './src/components/NoInternetBar';
import Splash from './src/screens/Splash';
import { Toast } from './src/utils/utilFunctions';
import idx from 'idx';

const Stack = createStackNavigator();
export const AuthContext = React.createContext();

function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'CHECK_INTERNET_CONNECTION':
          return {
            ...prevState,
            isSignout: true,
            isConnected: action.isConnected,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      isConnected: true,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        setTimeout(async () => {
          try {
            userToken = await getToken();
          } catch (e) {
            // Restoring token failed
          }

          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        }, 1000);

        // if token expired session expired here
        axios.interceptors.response.use(
          function (response) {
            return response;
          },
          async function (error) {
            const status = idx(error, (_) => _.response.status);
            const userToken = await getToken();
            if (status === 403) {
              if (userToken) {
                Toast('Session Expired');
                await clearToken().then(() => {
                  dispatch({ type: 'SIGN_OUT' });
                });
              }
            }
            return Promise.reject(error);
          }
        );
      } catch (e) {
        // Restoring token failed
      }
    };

    bootstrapAsync();
  }, []);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((info) => {
      dispatch({
        type: 'CHECK_INTERNET_CONNECTION',
        isConnected: info.isConnected,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (token) => {
        await setToken(token);
        dispatch({ type: 'SIGN_IN', token: token });
      },
      signOut: async () => {
        await clearUserName();
        clearToken().then(() => {
          dispatch({ type: 'SIGN_OUT' });
        });
      },
    }),
    []
  );

  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      {state.isConnected ? (
        <NavigationContainer>
          {state.userToken ? (
            <Stack.Navigator initialRouteName='User'>
              <Stack.Screen
                name='User'
                component={User}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='SongLookUp'
                component={SongLookUp}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen
                name='Home'
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='SignUp'
                component={SignUp}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      ) : (
        <NoInternetBar />
      )}
    </AuthContext.Provider>
  );
}

export default App;
