import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Scale';
import { strings } from '../const/strings';
import { Theme } from '../theme';
import { AuthContext } from '../../AppNavigator';
import { getUserName } from '../utils/StorageUtils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function User(props) {
  const [btnToggleHome, setBtnToggleHome] = useState(true);
  const [btnToggleLookUpSong, setBtnToggleLookUpSong] = useState(false);
  const { signOut } = React.useContext(AuthContext);
  const [user, setUser] = useState('');

  const toggle = (string) => {
    if (string === strings.HOME) {
      setBtnToggleHome(true);
      setBtnToggleLookUpSong(false);
    } else if (string === strings.SONG_LOOK_UP) {
      setBtnToggleHome(false);
    }
  };

  const onPressLogout = async () => {
    await signOut();
  };

  const setUserName = async () => {
    const userName = await getUserName();
    setUser(userName);
  };

  useEffect(() => {
    setUserName();
  }, []);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.userNameTxtView}>
        <TouchableOpacity
          style={styles.flx}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => onPressLogout()}
        >
          <Text style={styles.logoutTxt}>{strings.LOGOUT}</Text>
        </TouchableOpacity>

        <Text style={styles.userNameTxt}>{user}</Text>
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

      <View style={styles.bottomToggleView}>
        <View style={styles.borderView2} />
        <View style={styles.toggleView}>
          <Button
            onPress={() => toggle(strings.HOME)}
            title={strings.HOME}
            color={btnToggleHome === true ? Theme.BLUE : Theme.NAVY_BLUE}
            leftRadius
            btnWidth={responsiveWidth(27)}
            onPress={() => props.navigation.navigate('SongLookUp')}
          />
          <Button
            onPress={() => toggle(strings.SONG_LOOK_UP)}
            title={strings.SONG_LOOK_UP}
            rightRadius
            btnWidth={responsiveWidth(27)}
            color={btnToggleLookUpSong === true ? Theme.BLUE : Theme.NAVY_BLUE}
            onPress={() => props.navigation.navigate('SongLookUp')}
          />
        </View>
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
    marginTop: responsiveHeight(5),
    flexDirection: 'row',
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
  stringsTxt: {
    fontSize: responsiveFontSize(2.2),
    color: Theme.CYAN,
    fontWeight: 'bold',
  },
  listStrings: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
  },
  haveNoAcTxt: {
    fontSize: responsiveFontSize(2),
    color: Theme.CYAN,
    fontWeight: 'bold',
    paddingHorizontal: responsiveWidth(5),
  },
  bottomToggleView: {
    marginTop: responsiveHeight(30),
    bottom: 0,
  },
  toggleView: {
    paddingVertical: responsiveHeight(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userNameTxt: {
    fontSize: responsiveFontSize(1.6),
    color: Theme.CYAN,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  logoutTxt: {
    fontSize: responsiveFontSize(1.6),
    color: Theme.CYAN,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  flx: { flex: 1 },
});
