import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Theme } from '../theme';
import {
  responsiveHeight,
  responsiveWidth,
  isIphoneX,
  responsiveFontSize,
} from '../utils/Scale';

export default function Button(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.parentView(
          props.btnWidth,
          props.border,
          props.align,
          props.color,
          props.leftRadius,
          props.rightRadius
        ),
        props.style,
      ]}
    >
      <Text style={styles.buttonName(props.border, props.fontColor)}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  parentView: (width, border, align, color, leftRadius, rightRadius) => ({
    backgroundColor: border ? Theme.BLACK : color ? color : Theme.BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    width: width ? width : responsiveWidth(35),
    height: border ? responsiveHeight(6) : responsiveHeight(6.5),
    borderColor: border ? Theme.BLUE : 0,
    borderWidth: border ? 2 : 0,
    alignSelf: align ? align : 'flex-start',
    borderTopLeftRadius: leftRadius || border ? 7 : 0,
    borderBottomLeftRadius: leftRadius || border ? 7 : 0,
    borderTopRightRadius: rightRadius || border ? 7 : 0,
    borderBottomRightRadius: rightRadius || border ? 7 : 0,
  }),
  buttonName: (border, fontColor) => ({
    color: fontColor ? fontColor : Theme.WHITE,
    fontSize: border ? responsiveFontSize(1.6) : responsiveFontSize(1.4),
    alignSelf: 'center',
    textAlign: 'center',
  }),
});
