const UPDATE_COUNTERS = 'UPDATE_COUNTERS';
const DECREASE_COUNTER = 'DECREASE_COUNTER';

const initState = {
  pendingTripImagesCount: 0,
  pendingNationalCardImagesCount: 0,
  pendingMaintenanceCount: 0,
  unreadFeedbackCount: 0,
  messages: []
};

export default function notificationReducer(state = initState, action) {
  switch (action.type) {
    case UPDATE_COUNTERS: {
      const {
        pendingTripImagesCount,
        pendingNationalCardImagesCount,
        unreadFeedbackCount,
        pendingMaintenanceCount
      } = action.payload;
      return {
        pendingTripImagesCount,
        pendingNationalCardImagesCount,
        unreadFeedbackCount,
        pendingMaintenanceCount,
        messages: [...state.messages]
      };
    }
    case DECREASE_COUNTER: {
      const { field } = action.payload;
      return {
        messages: [...state.messages],
        ...state,
        [field]: state[field] - 1
      };
    }
    default:
      return state;
  }
}

export const updateCounters = (info) => ({
  type: UPDATE_COUNTERS,
  payload: { ...info }
});

export const decreaseCounter = (info) => ({
  type: DECREASE_COUNTER,
  payload: { ...info }
});
