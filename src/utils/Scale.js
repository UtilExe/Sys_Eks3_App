import { Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');

export const deviceHeight = height;

export const deviceWidth = width;

export const responsiveHeight = (h) => deviceHeight * (h / 100);

export const responsiveWidth = (w) => width * (w / 100);

export const responsiveFontSize = (f) =>
  Math.sqrt(height * height + width * width) * (f / 100);

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}
