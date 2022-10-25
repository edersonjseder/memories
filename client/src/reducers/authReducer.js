import { FAIL, LOGOUT, AUTH } from "../actions/constants/authType";

export const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null };
    case FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
