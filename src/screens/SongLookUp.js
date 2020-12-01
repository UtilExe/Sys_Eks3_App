import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Scale';
import { strings } from '../const/strings';
import TextInputNew from '../components/TextInput';
import { Theme } from '../theme';
import { AppImages } from '../assets/images';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { SONG_SEARCH } from '../redux/action/SongSearch';
import idx from 'idx';
import moment from 'moment';
import { CLEAR_REDUCER_STATE } from '../redux/action/common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SongLookUp = (props) => {
  const [btnToggleItunesPrice, setBtnToggleItunesPrice] = useState(true);
  const [btnToggleSongLyrics, setBtnToggleSongLyrics] = useState(false);
  const [btnToggleSimilarArtist, setBtnToggleSimilarArtist] = useState(false);
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [songData, setSongData] = useState();
  const [loader, setLoader] = useState(false);

  const isDataAvailable = idx(songData, (_) => _.itunes.results.length) || 0;

  const toggle = (string) => {
    if (string === strings.ITUNES_PRICE) {
      setBtnToggleItunesPrice(true);
      setBtnToggleSongLyrics(false);
      setBtnToggleSimilarArtist(false);
    } else if (string === strings.SONG_LYRICS) {
      setBtnToggleSongLyrics(true);
      setBtnToggleItunesPrice(false);
      setBtnToggleSimilarArtist(false);
    } else if (string === strings.SIMILAR_ARTIST) {
      setBtnToggleSimilarArtist(true);
      setBtnToggleItunesPrice(false);
      setBtnToggleSongLyrics(false);
    }
  };

  useEffect(() => {
    props.clearReducerState();
  }, []);

  useEffect(() => {
    let data;
    data = idx(props, (_) => _.getResponse) || {};
    setSongData(data);
  }, [props]);

  const ItunesPriceList = () => {
    const artistName = idx(songData, (_) => _.itunes.results[0].artistName);
    const songName = idx(
      songData,
      (_) => _.itunes.results[0].trackCensoredName
    );

    const releaseDate = idx(songData, (_) => _.itunes.results[0].releaseDate);
    const price = idx(songData, (_) => _.itunes.results[0].trackPrice);
    const country = idx(songData, (_) => _.itunes.results[0].country);
    const currency = idx(songData, (_) => _.itunes.results[0].currency);
    const collectionName = idx(
      songData,
      (_) => _.itunes.results[0].collectionName
    );

    const releasedDate = releaseDate
      ? moment(releaseDate).format('YYYY-MM-DD')
      : '';

    return (
      <View style={styles.itunesPriceList}>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.dataTxt}>
            {strings.SONG_NAME + ': ' + (songName ? songName : '')}
          </Text>

          <Text style={styles.dataTxt}>
            {strings.ARTIST_NAME + ': ' + (artistName ? artistName : '')}
          </Text>

          <Text style={styles.dataTxt}>
            {strings.RELEASE_DATE + ': ' + releasedDate}
          </Text>

          <Text style={styles.dataTxt}>
            {strings.PRICE + ': ' + (price ? price : '')}
          </Text>

          <Text style={styles.dataTxt}>
            {strings.COUNTRY + ': ' + (country ? country : '')}
          </Text>

          <Text style={styles.dataTxt}>
            {strings.CURRENCY + ': ' + (currency ? currency : '')}
          </Text>

          <Text style={styles.dataTxt}>
            {strings.COLLECTION_NAME +
              ': ' +
              (collectionName ? collectionName : '')}
          </Text>
        </ScrollView>
      </View>
    );
  };
  const SongLyrics = () => {
    const lyrics = idx(songData, (_) => _.lyrics.lyrics);

    return (
      <View style={styles.itunesPriceList}>
        <ScrollView nestedScrollEnabled={true}>
          <Text style={styles.itunesPlaylistText}>{lyrics ? lyrics : ''}</Text>
        </ScrollView>
      </View>
    );
  };
  const SimilarArtist = () => {
    const similarArtistName = idx(
      songData,
      (_) => _.similar.Similar.Results[0].Name
    );

    const wTeaser = idx(songData, (_) => _.similar.Similar.Results[0].wTeaser);

    const wUrl = idx(songData, (_) => _.similar.Similar.Results[0].wUrl);

    return (
      <View style={styles.itunesPriceList}>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.dataTxt}>
            {strings.SIMILAR_ARTIST +
              ': ' +
              (similarArtistName ? similarArtistName : '')}
          </Text>

          <Text style={styles.dataTxt}>
            {strings.WTEASER + ': ' + (wTeaser ? wTeaser : '')}
          </Text>

          <Text style={styles.dataTxt}>
            {strings.WURL + ': ' + (wUrl ? wUrl : '')}
          </Text>
        </ScrollView>
      </View>
    );
  };

  const searchSong = () => {
    const data = {
      song: songTitle,
      artist: songArtist,
    };

    setLoader(true);
    props.serchingSongs(data, () => {
      onResponse();
    });
  };

  const onResponse = (status) => {
    if (status === 200) {
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  const showMessage = (songSearched) => {
    if (songSearched === false) {
      return (
        <View style={styles.errormodal}>
          <Text style={styles.infoTxt}>{strings.INFORMATION}</Text>
        </View>
      );
    }
    return (
      <View style={styles.errormodal}>
        <Image
          source={AppImages.error}
          style={styles.errorImg}
          resizeMode='contain'
        />
        <Text style={styles.errorTxt}>
          {strings.WE_COUDNT_FIND_INFORMATION}
        </Text>
      </View>
    );
  };
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.userNameTxtView}>
        <Text style={styles.titleTxt}>{strings.SONG_LOOK_UP}</Text>
      </View>

      <View style={styles.borderView} />

      <View style={styles.paddingVrtcl}>
        <View style={styles.flexDrctn}>
          <View style={styles.textInputWidth}>
            <TextInputNew
              value={songTitle}
              label={strings.SONG_TITLE}
              placeholder='Song title...'
              onChangeText={(text) => setSongTitle(text)}
              autoCapitalize={'none'}
              autoFocus={true}
            />
          </View>
          <View style={styles.textInputWidth}>
            <TextInputNew
              value={songArtist}
              label={strings.SONG_ARTIST}
              placeholder='Song artist...'
              onChangeText={(text) => setSongArtist(text)}
              autoCapitalize={'none'}
            />
          </View>
        </View>

        <View style={styles.flexDrctn}>
          <Button
            title={strings.GO}
            border
            align={'flex-start'}
            btnWidth={responsiveWidth(25)}
            onPress={() => searchSong()}
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

      <View style={styles.borderView2} />

      <View style={styles.bottomToggleView}>
        {isDataAvailable <= 0 ? (
          showMessage(props.songSearched)
        ) : (
          <>
            <View style={styles.toggleView}>
              <Button
                onPress={() => toggle(strings.ITUNES_PRICE)}
                title={strings.ITUNES_PRICE}
                color={
                  btnToggleItunesPrice === true ? Theme.SMOKE : Theme.WHITE
                }
                leftRadius
                btnWidth={responsiveWidth(27)}
                fontColor={Theme.BLACK}
              />
              <Button
                onPress={() => toggle(strings.SONG_LYRICS)}
                title={strings.SONG_LYRICS}
                color={btnToggleSongLyrics === true ? Theme.SMOKE : Theme.WHITE}
                btnWidth={responsiveWidth(27)}
                fontColor={Theme.BLACK}
              />
              <Button
                onPress={() => toggle(strings.SIMILAR_ARTIST)}
                title={strings.SIMILAR_ARTIST}
                rightRadius
                btnWidth={responsiveWidth(27)}
                color={
                  btnToggleSimilarArtist === true ? Theme.SMOKE : Theme.WHITE
                }
                fontColor={Theme.BLACK}
              />
            </View>
            <View>
              {btnToggleItunesPrice === true
                ? ItunesPriceList()
                : btnToggleSongLyrics === true
                ? SongLyrics()
                : btnToggleSimilarArtist === true
                ? SimilarArtist()
                : null}
            </View>
          </>
        )}
      </View>

      <View style={[styles.borderView2, styles.marginTopTwo]} />

      <View style={styles.bottomView}>
        <Button
          title={strings.HOME}
          color={Theme.BLUE}
          align={'center'}
          border={false}
          btnWidth={responsiveWidth(30)}
          onPress={() => props.navigation.navigate('User')}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    getResponse: state.SongSearch.songSearchResponse,
    songSearched: state.SongSearch.songSearched,
    isLoader: state.SongSearch.isLoader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    serchingSongs: (data, callBack) =>
      dispatch({ type: SONG_SEARCH, data, callBack }),
    clearReducerState: () => dispatch({ type: CLEAR_REDUCER_STATE }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongLookUp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.BLACK,
    paddingHorizontal: responsiveWidth(10),
  },
  userNameTxtView: {
    width: '100%',
    paddingVertical: responsiveHeight(4.5),
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
  marginTopTwo: {
    marginTop: responsiveHeight(2),
  },
  bottomView: {
    paddingVertical: responsiveHeight(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  userNameTxt: {
    fontSize: responsiveFontSize(1.6),
    color: Theme.CYAN,
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: responsiveWidth(8),
  },
  bottomToggleView: {
    marginTop: responsiveHeight(0),
    bottom: 0,
  },
  toggleView: {
    paddingVertical: responsiveHeight(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itunesPriceList: {
    width: '100%',
    height: responsiveHeight(35),
  },
  errormodal: {
    width: '100%',
    height: responsiveHeight(47),
  },
  errorTxt: {
    fontSize: responsiveFontSize(2.5),
    color: Theme.CYAN,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: responsiveHeight(-2),
    width: '80%',
    alignSelf: 'center',
  },
  errorImg: {
    width: responsiveWidth(9),
    height: responsiveHeight(7),
    marginLeft: responsiveWidth(3),
    marginTop: responsiveHeight(2),
  },
  dataTxt: {
    fontSize: responsiveFontSize(2.2),
    color: Theme.CYAN,
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: responsiveHeight(1),
  },
  textInputWidth: { width: '50%' },
  paddingVrtcl: { paddingVertical: responsiveHeight(3) },
  flexDrctn: { flexDirection: 'row' },
  itunesPlaylistText: { color: Theme.WHITE, textAlign: 'center' },
  indicatorView: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTxt: {
    fontSize: responsiveFontSize(2.5),
    color: Theme.CYAN,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: responsiveHeight(6),
    width: '85%',
    alignSelf: 'center',
  },
});
