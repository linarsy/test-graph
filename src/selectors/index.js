import { createSelector } from 'reselect';

export const getBillingById = state => state.billing.byId;
export const getBillingIds = state => state.billing.allIds;

export const billingSelector = createSelector(
  [getBillingById, getBillingIds],
  (byId, allIds) => allIds.map(id => byId[id]),
);

export const billingSelectorToday = createSelector(
  [billingSelector],
  billing => billing.slice(0, 3).reduce((acc, { today }) => acc + today, 0),
);

export const billingSelectorYesterday = createSelector(
  [billingSelector],
  billing => billing.slice(0, 3).reduce((acc, { yesterday }) => acc + yesterday, 0),
);

export const billingSelectorDayOfWeek = createSelector(
  [billingSelector],
  billing => billing.slice(0, 3).reduce((acc, { dayOfWeek }) => acc + dayOfWeek, 0),
);
