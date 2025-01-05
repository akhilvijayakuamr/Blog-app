import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authState } from "../../interface/PersistInterface";

// Initialize State
const initialState: authState = {
  userLogin: false,
  email: '',
  userId: '',
  access: null,
  refresh: null,
  // userProfile: '',
};

// Create authSlice

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setUserLogin: (
      state,
      action: PayloadAction<{ userId: string; email: string; access: string; refresh: string}>
    ) => {
      state.userLogin = true;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh
      // state.userProfile = action.payload.userProfile;
    },

    userLogout:(state) =>{
      state.userLogin = false;
      state.userId = '';
      state.email = '';
      state.access = null;
      state.refresh = null;
  },

  setAccessToken: (state, action: PayloadAction<{ access: string }>) => {
    state.access = action.payload.access;
  },
  },
});


export const { setUserLogin,userLogout, setAccessToken  } = authSlice.actions;
export default authSlice.reducer;
