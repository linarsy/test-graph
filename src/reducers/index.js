import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';

import * as actions from '../actions';
import initData from '../initData';

const billing = handleActions({

}, initData.billing);

export default combineReducers({
  billing,
  form: formReducer,
});
