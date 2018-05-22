var config = require('./../../config');

export const setPlans = (payload) => ({
  type: 'FETCH_PLANS_FULLFILLED',
  payload
});


export const getPlans = () => ({
  type: 'API',
  payload: {
    url: config.api.url+ '/plans',
    type: 'GET',
    success: ({ data }) => setPlans(data),
  }
});
