import { createSelector } from 'reselect';

export const getBillingById = state => state.billing.byId;
export const getBillingIds = state => state.billing.allIds;

export const billingSelector = createSelector(
  [getBillingById, getBillingIds],
  (byId, allIds) => allIds.map(id => byId[id]),
);
