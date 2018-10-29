import * as actionTypes from './actionTypes';
const getInitialState = () => ({
  events: [],
  event: {},
  award_winner_email: '',
  award_creator: {}
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case `${actionTypes.GET_EVENTS}_FULFILLED`: {
      return {...state, events: action.payload};
    }
    case `${actionTypes.GET_EVENT}_FULFILLED`: {
      return {...state, event: action.payload};
    }
    case `${actionTypes.GET_EVENT_REGISTRANTS}_FULFILLED`: {
      return {...state, award_creator: action.payload};
    }
    case `${actionTypes.ADD_REGISTRANT}_FULFILLED`: {
      return {...state};
    }
    case actionTypes.TOGGLE_RESULT_DIALOG: {
      return {...state, resultToggled: !state.resultToggled}
    }
    default: return state;
  }
}