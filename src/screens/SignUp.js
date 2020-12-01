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
import { register } from '../Api';
import { Toast } from '../utils/utilFunctions';
import idx from 'idx';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SignUp(props) {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [reTypePassword, setReTypePassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorReTypePassword, setErrorReTypePassword] = useState(null);
  const [errorPasswordDontMatch, setErrorPasswordDontMatch] = useState(null);
  const [loader, setLoader] = useState(false);

  const validation = async () => {
    const data = {
      username: emailId,
      password: password,
      passwordCheck: reTypePassword,
    };

    if (emailId === '') {
      setErrorEmail("Username Doesn't exist");
    } else if (password === '') {
      setErrorPassword('Enter Your Password Please');
    } else if (reTypePassword === '') {
      setErrorReTypePassword('Enter Confirmation Password Please');
    } else if (password !== reTypePassword) {
      setErrorPasswordDontMatch("Password Don't Match");
    } else {
      setLoader(true);
      const res = await register(data);
      const status = idx(res, (_) => _.status);
      const message = idx(res, (_) => _.message);

      if (status === 200) {
        setLoader(false);
        props.navigation.navigate('Login');
        setEmailId('');
        setPassword('');
        setReTypePassword('');
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

  const onChangeTextPassword = (text) => {
    setPassword(text);
    setErrorPassword(null);
    setErrorPasswordDontMatch(null);
  };

  const onChangeTextReTypePassword = (text) => {
    setReTypePassword(text);
    setErrorReTypePassword(null);
    setErrorPasswordDontMatch(null);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.userNameTxtView}>
        <Text style={styles.titleTxt}>{strings.SIGN_UP}</Text>
      </View>

      <View style={styles.borderView} />

      <View style={styles.paddingVrtcl}>
        <TextInput
          value={emailId}
          label={strings.USERNAME}
          onChangeText={(text) => onChangeTextEmail(text)}
          errorTxt={errorEmail && errorEmail}
          textContentType={'emailAddress'}
          autoCapitalize={'none'}
          autoFocus={true}
        />

        <TextInput
          value={password}
          label={strings.PASSWORD}
          secureTextEntry
          onChangeText={(text) => onChangeTextPassword(text)}
          errorTxt={errorPassword && errorPassword}
        />

        <TextInput
          value={reTypePassword}
          label={strings.RE_TYPE_PASSWORD}
          secureTextEntry
          onChangeText={(text) => onChangeTextReTypePassword(text)}
          errorTxt={errorReTypePassword && errorReTypePassword}
        />

        <View style={styles.btnAndErrorView}>
          <Button
            onPress={() => validation()}
            title={strings.SIGN_UP}
            border
            style={styles.marginTopOne}
            align={'flex-start'}
          />
          {errorPasswordDontMatch ? (
            <Text style={styles.errorText}>
              {errorPasswordDontMatch && errorPasswordDontMatch}
            </Text>
          ) : (
            <View style={styles.indicatiorView}>
              <ActivityIndicator
                size='large'
                color={Theme.WHITE}
                style={styles.indicator}
                animating={loader && loader}
              />
            </View>
          )}
        </View>
      </View>

      <View style={styles.borderView} />

      <Text style={[styles.haveNoAcTxt, styles.marginTopFive]}>
        {strings.ALREADY_HAVE_AN_ACCOUNT}
      </Text>

      <Button
        onPress={() => props.navigation.navigate('Login')}
        title={strings.LOGIN}
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
  errorText: {
    color: Theme.RED,
    textAlign: 'right',
    fontSize: responsiveFontSize(1.6),
    marginLeft: responsiveWidth(3),
  },
  indicatiorView: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    alignSelf: 'center',
  },
  paddingVrtcl: { paddingVertical: responsiveHeight(8) },
  btnAndErrorView: { flexDirection: 'row', alignItems: 'center' },
});
