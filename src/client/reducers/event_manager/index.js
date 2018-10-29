import * as actionTypes from './actionTypes';
const getInitialState = () => ({
  sidebarOpen: false
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_DRAWER: {
      const {sidebarOpen} = state;
      return {...state, sidebarOpen: !sidebarOpen}
    }
    default: return state;
  }
}