var config = require('./../../config');

export const setTrainings = (payload) => ({
  type: 'FETCH_TRAININGS_FULLFILLED',
  payload
});

export const setPlanTrainings = (payload) => ({
  type: 'FETCH_PLAN_TRAININGS_FULLFILLED',
  payload
});


// this will return user started trainings
export const getTrainings = (userId) => ({
  type: 'API',
  payload: {
    url: config.api.url+ '/users/' + userId + '/trainings/',
    type: 'GET',
    success: ({ data }) => setTrainings(data),
  }
});

export const startPlan = (planId, userId) => ({
  type: 'API',
  payload: {
    url: config.api.url+ '/plans/' + planId + '/users/' + userId + '/start',
    type: 'POST',
    success: ({ data }) => setTrainings(data),
    //handleError: ({ error }) => displayError(error)
  }
});
