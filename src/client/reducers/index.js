import {combineReducers} from 'redux';
import event_manager from './event_manager';
import events from './events';
export default combineReducers({
  events,
  event_manager
});