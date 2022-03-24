const SHOW_LOADING = 'SHOW_LOADING';
const HIDE_LOADING = 'HIDE_LOADING';

const initState = {
  show: false
};
export default function loadingReducer(state = initState, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return {
        show: true
      };
    case HIDE_LOADING:
      return {
        show: false
      };
    default:
      return state;
  }
}

export const showLoading = () => ({
  type: SHOW_LOADING
});

export const hideLoading = () => ({
  type: HIDE_LOADING
});
