import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./mainStore";
export interface AuthError {
  message: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  currentUser?: CurrentUser;
  error: AuthError;
}

export interface CurrentUser {
  id: string;
  display_name: string;
  email: string;
  photo_url: string;
}
export const initialState: AuthState = {
  isLoggedIn: false,
  isFetching: true,
  isSuccess: false,
  error: { message: "An Error occurred" },
};

export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  const response = await fetch("/api/isauthenticated", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  console.log('dont miss this shit!!!');
  console.log(await response.json());
  
  return (await response.json()) as CurrentUser;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state, { payload }: PayloadAction) => {
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isFetching = false;
      state.isLoggedIn = false;
    });
  },
});

export const { clearState } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;
