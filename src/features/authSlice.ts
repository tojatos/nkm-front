import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import { LOGIN_URL, REGISTER_URL } from "../app/consts";
import { Login, RegisterRequest } from "../types/login";
import { AuthState } from "../types/authState";

const initialState: AuthState = {
  token: null,
  login: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.login = action.payload.login;
    },
    authLogout: (state) => {
      state.token = null;
      state.login = null;
    },
  },
});

export const { authLogin, authLogout } = authSlice.actions;

export const authenticate = ({ login, password }: Login): AppThunk => async (
  dispatch
) => {
  try {
    const result = await axios.post(LOGIN_URL, {
      login: login,
      password: password,
    });
    if (result.status === 200) {
      const token = result.data;
      dispatch(authLogin({ token, login }));
    }
  } catch (error) {
    console.warn(error);
  }
};

// export const registerUser = ({ login, email, password }: RegisterRequest): AppThunk => async (
export const registerUser = (
  registerRequest: RegisterRequest
): AppThunk => async (dispatch) => {
  try {
    // const result = await axios.post(REGISTER_URL, {
    //   login: login,
    //   password: password,
    // });

    const result = await axios.post(REGISTER_URL, registerRequest);
    if (result.status === 201) {
      //   const token = result.data;
      // dispatch(authLogin({ token, login }));
      console.log("Registered");
    } else {
      console.log("Not registered");
      console.log(result.status);
    }
  } catch (error) {
    console.warn(error);
  }
};

export default authSlice.reducer;
