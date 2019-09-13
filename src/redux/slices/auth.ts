import { createSlice, PayloadAction } from "redux-starter-kit";

import { AppThunk } from "../store";
import { updateBranch } from "./config";

interface AuthState {
  hasCheckedAuth: boolean;
  email: string | null;
}

const initialState: AuthState = {
  email: null,
  hasCheckedAuth: false,
};

const auth = createSlice({
  slice: "auth",
  initialState,
  reducers: {
    checkAuthSuccess(state, action: PayloadAction<string>) {
      state.hasCheckedAuth = true;
      state.email = action.payload;
    },
    checkAuthFailure(state) {
      state.hasCheckedAuth = true;
    },
    saveAuth(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    removeAuth(state) {
      state.email = null;
    },
  },
});

export const {
  checkAuthSuccess,
  checkAuthFailure,
  saveAuth,
  removeAuth,
} = auth.actions;
export default auth.reducer;

function emailToBranchName(email: string): string {
  const branchName = email.split("@")[0].replace(".", "-");
  return branchName;
}

export const checkAuth = (): AppThunk => async dispatch => {
  const email = window.localStorage.getItem("email");
  if (email) {
    const branchName = emailToBranchName(email);

    const response = await fetch(`/api/branches/${branchName}`);
    if (!response.ok) {
      await fetch("/api/branches", {
        method: "POST",
        body: JSON.stringify({ name: branchName }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }

    dispatch(updateBranch(branchName));
    dispatch(checkAuthSuccess(email));
  } else {
    dispatch(checkAuthFailure());
  }
};

export const setAuth = (email: string): AppThunk => async dispatch => {
  const branchName = emailToBranchName(email);

  const response = await fetch(`/api/branches/${branchName}`);
  if (!response.ok) {
    await fetch("/api/branches", {
      method: "POST",
      body: JSON.stringify({ name: branchName }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  window.localStorage.setItem("email", email);
  dispatch(updateBranch(branchName));
  dispatch(saveAuth(email));
};

export const unsetAuth = (): AppThunk => dispatch => {
  window.localStorage.removeItem("email");
  dispatch(removeAuth());
};
