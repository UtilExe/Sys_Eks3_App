import React from 'react';
import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';
import { Theme } from '../theme';
import {
  responsiveHeight,
  responsiveWidth,
  isIphoneX,
  responsiveFontSize,
} from '../utils/Scale';

export default function TestInput(props) {
  return (
    <View style={[styles.parentView, props.ViewStyle]}>
      <Text style={styles.LabelTxt}>{props.label}</Text>
      <TextInput
        blurOnSubmit={props.blurOnSubmit}
        style={[styles.inputView(props.errorTxt), props.style]}
        placeholder={props.placeholder}
        placeholderTextColor={Theme.BLACK}
        onChangeText={props.onChangeText}
        onFocus={props.onFocus}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
        onSubmitEditing={props.onSubmitEditing}
        textContentType={props.textContentType}
        autoCapitalize={props.autoCapitalize}
        autoFocus={props.autoFocus}
      />
      <Text style={styles.errorText}>{props.errorTxt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  parentView: {
    marginBottom: responsiveHeight(0.2),
  },
  inputView: (errorTxt) => ({
    backgroundColor: Theme.WHITE,
    width: '100%',
    borderColor: errorTxt ? Theme.RED : Theme.BLUE,
    borderWidth: 2,
    borderRadius: 5,
    fontSize: responsiveFontSize(1.6),
    color: Theme.BLACK,
    paddingTop: Platform.OS === 'ios' ? 10 : 6,
    paddingBottom: Platform.OS === 'ios' ? 10 : 6,
    paddingLeft: 15,
    paddingRight: 15,
  }),
  LabelTxt: {
    color: Theme.WHITE,
    marginBottom: responsiveHeight(0.5),
    fontWeight: 'bold',
  },
  errorText: {
    color: Theme.RED,
    textAlign: 'right',
    fontSize: responsiveFontSize(1.6),
  },
});
