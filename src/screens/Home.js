import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Button from '../components/Button';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Scale';
import { strings } from '../const/strings';
import { Theme } from '../theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Home(props) {
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle='light-content' />

      <View style={styles.loginBtnView}>
        <Button
          title={strings.LOGIN}
          border
          align={'flex-end'}
          onPress={() => props.navigation.navigate('Login')}
        />
      </View>

      <View style={styles.borderView} />

      <Text style={styles.titleTxt}>{strings.WELCOME}</Text>

      <View style={styles.listStrings}>
        <Text style={styles.stringsTxt}>{strings.HOW_TO_USE_THIS_APP}</Text>
        <Text style={styles.stringsTxt}>{strings.NO_1}</Text>
        <Text style={styles.stringsTxt}>{strings.NO_2}</Text>
        <Text style={styles.stringsTxt}>{strings.NO_3}</Text>
        <Text style={styles.stringsTxt}>{strings.NO_4}</Text>
      </View>
      <Text style={styles.stringsTxt}>{strings.YOU_ARE_DONE}</Text>
      <View style={[styles.borderView, styles.marginTopFour]} />

      <Text style={[styles.haveNoAcTxt, styles.marginTopFive]}>
        {strings.DONT_HAVE_AN_ACCOUNT}
      </Text>

      <Button
        title={strings.SIGN_UP}
        border
        style={styles.marginTopTwo}
        align={'center'}
        onPress={() => props.navigation.navigate('SignUp')}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.BLACK,
    paddingHorizontal: responsiveWidth(10),
  },
  loginBtnView: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingVertical: responsiveHeight(5),
    marginTop: responsiveHeight(5),
  },
  borderView: {
    borderBottomWidth: 0.8,
    borderBottomColor: Theme.CYAN,
  },
  titleTxt: {
    fontSize: responsiveFontSize(3),
    color: Theme.CYAN,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: responsiveHeight(3),
  },
  stringsTxt: {
    fontSize: responsiveFontSize(2.2),
    color: Theme.CYAN,
    fontWeight: 'bold',
  },
  listStrings: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
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
    color: Theme.CYAN,
    fontWeight: 'bold',
    paddingHorizontal: responsiveWidth(5),
  },
});
