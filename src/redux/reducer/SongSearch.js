import { CLEAR_REDUCER_STATE } from '../action/common';
import {
  SONG_SEARCH_ERROR,
  SONG_SEARCH_SUCCESSFUL,
} from '../action/SongSearch';

const initialState = {
  songSearched: false,
  songSearchResponse: undefined,
  songSearchError: '',
};

const SongSearch = (state = initialState, action) => {
  switch (action.type) {
    case SONG_SEARCH_SUCCESSFUL:
      return {
        ...state,
        songSearchResponse: action.res,
        songSearched: true,
      };
    case SONG_SEARCH_ERROR:
      return {
        ...state,
        songSearchError: action.error,
        songSearched: true,
      };
    case CLEAR_REDUCER_STATE:
      return initialState;
    default:
      return state;
  }
};

export default SongSearch;
