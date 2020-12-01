import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Theme } from '../theme';

const Splash = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={Theme.WHITE} animating={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.BLACK,
  },
});
export default Splash;
