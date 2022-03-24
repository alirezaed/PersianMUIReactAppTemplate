const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initState = {
  isLoggin: false,
  userName: ''
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN: {
      const { accessToken, fullname } = action.payload;
      window.localStorage.setItem('token', accessToken);
      window.localStorage.setItem('fullname', fullname);
      return {
        ...state,
        isLoggin: true,
        userName: fullname
      };
    }
    case LOGOUT: {
      window.localStorage.removeItem('token');
      return {
        ...initState
      };
    }
    default:
      return state;
  }
}

export const login = (data) => ({
  type: LOGIN,
  payload: data
});

export const logout = () => ({
  type: LOGOUT
});
