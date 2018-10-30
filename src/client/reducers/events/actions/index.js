import api from '../../../utils/api';
import * as actionTypes from '../actionTypes';

export const getEvents = () => {
  return {
    type: actionTypes.GET_EVENTS,
    payload: api('/events').then(res => res.json())
  }
}

export const getEvent = (id) => {
  return {
    type: actionTypes.GET_EVENT,
    payload: api(`/events/${id}`).then(res => res.json())
  }
}

export const addRegistrant = (id, registrant) => {
  return {
    type: actionTypes.ADD_REGISTRANT,
    payload: api(`/events/${id}/registrant`, {
      method: 'POST',
      body: registrant
    }).then()
  }
}

export const getEventRegistrants = (id) => {
  return {
    type: actionTypes.GET_EVENT_REGISTRANTS,
    payload: api(`/events/${id}/registrant`).then(res => res.json())
  }
}

export const toggleResultDialog = () => {
  return {
    type: actionTypes.TOGGLE_RESULT_DIALOG
  }
}

export const signInRegistrant = (id, registrantId, index) => {
  return {
    type: actionTypes.SIGN_IN_REGISTRANT,
    meta: {index},
    payload: api(`/events/${id}/registrant/${registrantId}/signIn`, {
      method: 'PUT'
    })
      .then(res => ({}))
  }
}

export const setWinnerHistory = (registrant, item) => {
  return {
    type: actionTypes.SET_WINNER_HISTORY,
    payload: {registrant, item}
  }
}