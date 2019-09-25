import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from '../actions';
import initData from '../initData';

const billing = handleActions({
  [actions.hideRow](state, { payload: { attributes } }) {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: { ...byId, [attributes.id]: { ...attributes, visible: !attributes.visible } },
      allIds,
    };
  },
}, initData.billing);

export default combineReducers({
  billing,
});
