import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Button from '../components/Button';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Scale';
import { strings } from '../const/strings';
import TextInput from '../components/TextInput';
import { Theme } from '../theme';
import { login } from '../Api';
import idx from 'idx';
import { Toast } from '../utils/utilFunctions';
import { setToken, setUserName } from '../utils/StorageUtils';
import { AuthContext } from '../../AppNavigator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Login(props) {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const { signIn } = React.useContext(AuthContext);
  const [loader, setLoader] = useState(false);

  const loginUser = async () => {
    if (emailId === '') {
      setErrorEmail('Enter Your Username');
    } else if (password === '') {
      setErrorPassword('Enter Your Password');
    } else {
      setLoader(true);
      const data = {
        username: emailId,
        password: password,
      };

      const res = await login(data);
      const status = idx(res, (_) => _.status);
      const message = idx(res, (_) => _.message);
      const token = idx(res, (_) => _.token);

      if (res.code === 403) {
        setLoader(false);
        Toast(res.message);
      } else if (status === 200 && token) {
        setLoader(false);
        await setToken(token);
        await setUserName(emailId);
        signIn(token);
        setEmailId('');
        setPassword('');
      } else {
        setLoader(false);
        Toast(message);
      }
    }
  };

  const onChangeTextEmail = (text) => {
    setEmailId(text);
    setErrorEmail(null);
  };

  const onChangeTextPasswrod = (text) => {
    setPassword(text);
    setErrorPassword(null);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.userNameTxtView}>
        <Text style={styles.titleTxt}>{strings.LOGIN}</Text>
      </View>

      <View style={styles.borderView} />

      <View style={styles.paddingVrtcl}>
        <TextInput
          value={emailId}
          label={strings.USERNAME}
          onChangeText={(text) => onChangeTextEmail(text)}
          errorTxt={errorEmail && errorEmail}
          autoCapitalize={'none'}
          autoFocus={true}
        />

        <TextInput
          value={password}
          label={strings.PASSWORD}
          secureTextEntry
          onChangeText={(text) => onChangeTextPasswrod(text)}
          errorTxt={errorPassword && errorPassword}
        />

        <View style={styles.btnAndIndicatorView}>
          <Button
            onPress={() => loginUser()}
            title={strings.LOGIN}
            border
            style={styles.marginTopOne}
            align={'flex-start'}
          />

          <View style={styles.indicatorView}>
            <ActivityIndicator
              size='large'
              color={Theme.WHITE}
              style={styles.indicator}
              animating={loader && loader}
            />
          </View>
        </View>
      </View>

      <View style={styles.borderView} />

      <Text style={[styles.haveNoAcTxt, styles.marginTopFive]}>
        {strings.DONT_HAVE_AN_ACCOUNT}
      </Text>

      <Button
        onPress={() => props.navigation.navigate('SignUp')}
        title={strings.SIGN_UP}
        border
        style={styles.marginTopTwo}
        align={'center'}
      />

      <View style={[styles.borderView2, styles.marginTopFive]} />

      <View style={styles.bottomView}>
        <Button
          onPress={() => props.navigation.navigate('Home')}
          title={strings.HOME}
          btnWidth={responsiveWidth(27)}
          align={'center'}
          color={Theme.BLUE}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.BLACK,
    paddingHorizontal: responsiveWidth(10),
  },
  userNameTxtView: {
    width: '100%',
    paddingVertical: responsiveHeight(5),
  },
  borderView: {
    borderBottomWidth: 0.8,
    borderBottomColor: Theme.CYAN,
  },
  borderView2: {
    borderBottomWidth: 2,
    borderBottomColor: Theme.GRAY,
  },
  titleTxt: {
    fontSize: responsiveFontSize(3),
    color: Theme.CYAN,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: responsiveHeight(3),
  },
  marginTopOne: {
    marginTop: responsiveHeight(1),
  },
  marginTopTwo: {
    marginTop: responsiveHeight(2),
  },
  marginTopThree: {
    marginTop: responsiveHeight(3),
  },
  marginTopFour: {
    marginTop: responsiveHeight(4),
  },
  marginTopFive: {
    marginTop: responsiveHeight(5),
  },
  haveNoAcTxt: {
    fontSize: responsiveFontSize(2),
    color: '#cccccc',
    fontWeight: 'bold',
    paddingHorizontal: responsiveWidth(5),
  },
  bottomView: {
    paddingVertical: responsiveHeight(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  userNameTxt: {
    fontSize: responsiveFontSize(1.6),
    color: '#cccccc',
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: responsiveWidth(8),
  },
  indicator: {
    alignSelf: 'center',
  },
  paddingVrtcl: { paddingVertical: responsiveHeight(8) },
  btnAndIndicatorView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorView: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
