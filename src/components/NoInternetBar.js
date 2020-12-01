import React from 'react';
import { StyleSheet, Text, Platform, View } from 'react-native';
import { strings } from '../const/strings';
import { Theme } from '../theme';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Scale';

const NoInternetBar = (props) => {
  return (
    <View style={styles.noInternetContainer}>
      <Text style={styles.noInternetText}>
        {strings.NO_INTERNET_CONNECTION}
      </Text>
      <View>
        <Text style={styles.noInternetCenterText}>
          {strings.PLEASE_CHECK_YOUR_INTERNET_CONNECTION}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noInternetText: {
    position: 'absolute',
    width: responsiveWidth(100),
    backgroundColor: Theme.BLUE,
    textAlign: 'center',
    color: Theme.WHITE,
    padding: responsiveWidth(1),
    fontSize:
      Platform.OS === 'ios' ? responsiveFontSize(1.9) : responsiveFontSize(2),
    top: 0,
  },
  noInternetCenterText: {
    textAlign: 'center',
    paddingHorizontal: responsiveWidth(5),
    color: Theme.WHITE,
  },
  noInternetContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.BLACK,
  },
});
export default NoInternetBar;
