import { createSlice } from '@reduxjs/toolkit';
import {MetaProps as EPGMetaProps, Platforms as EPGPlatforms} from './EPGMetaProps'
import {MetaProps as VODMetaProps, Platforms as VODPlatforms} from './VODMetaProps'

export const metapropsSlice = createSlice({
  name: 'metaprops',
  initialState: {
    value: 0,
    metaProps: EPGMetaProps(),
    platforms: EPGPlatforms(),
    selectedPlatforms : ["Samsung", "Roku"],
    showEPG: true,
  },
  reducers: {
    update: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    updatePlatforms: (state, action) => {
      state.selectedPlatforms = action.payload;
    },

    toggleShowEPG: (state) => {
      state.showEPG = !state.showEPG
      state.metaProps = state.showEPG ? EPGMetaProps() : VODMetaProps()
      state.platforms = state.showEPG ? EPGPlatforms() : VODPlatforms()
      state.selectedPlatforms = state.showEPG ? ["Samsung", "Roku"] : ["Sling", "Xumo"]
    }
  },
});

export const { update, updateByType, updatePlatforms, toggleShowEPG } = metapropsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(updateByType(amount));
  }, 1000);
};

export const updatePlatformsAsync = platforms => dispatch => {
    dispatch(updatePlatforms(platforms));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.metaprops.value;
export const selectMetaProps = state => state.metaprops.metaProps;
export const selectPlatforms = state => state.metaprops.platforms;
export const selectSelectedPlatforms = state => state.metaprops.selectedPlatforms;
export const selectShowEPG = state => state.metaprops.showEPG;

export default metapropsSlice.reducer;
