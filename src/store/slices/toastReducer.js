const SHOW_TOAST = 'SHOW_TOAST';
const HIDE_TOAST = 'HIDE_TOAST';

const initState = {
  show: false,
  message: ''
};

export default function toastReducer(state = initState, action) {
  switch (action.type) {
    case SHOW_TOAST: {
      return {
        show: true,
        message: action.payload
      };
    }
    case HIDE_TOAST: {
      return { ...initState };
    }
    default:
      return state;
  }
}

export const showToast = (info) => ({
  type: SHOW_TOAST,
  payload: info
});

export const hideToast = () => ({
  type: HIDE_TOAST
});
