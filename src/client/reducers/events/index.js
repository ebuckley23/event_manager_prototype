import * as actionTypes from './actionTypes';
import {immutArray, immutObject} from '../../utils/immutable_helper';
const getInitialState = () => ({
  events: [],
  event: {},
  award_winner_email: '',
  award_creator: {},
  award_history: []
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
    case `${actionTypes.SIGN_IN_REGISTRANT}_FULFILLED`: {
      const {index} = action.meta;
      const updatedRegistrant = state.award_creator.registrants[index];
        
      return {
        ...state,
        award_creator: {
          ...state.award_creator,
          registrants: immutArray(state.award_creator.registrants).updateAt(index).value(immutObject(updatedRegistrant).update('signedIn', !updatedRegistrant.signedIn))
        }
      };
    }
    case actionTypes.SET_WINNER_HISTORY: {
      return {...state, award_history: [...state.award_history, action.payload]};
    }
    default: return state;
  }
}