import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  password: string;
}

interface Session {
  user: User;
  timestamp: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  expired: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  expired: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.expired = false;
    },
    logoutUser: (state) => {
      localStorage.removeItem('session');
      state.user = null;
      state.isAuthenticated = false;
    },
    checkSession: (state) => {
      const session: Session | null = JSON.parse(localStorage.getItem('session') || 'null');
      if (session) {
        const now = Date.now();
        const isExpired = now - session.timestamp > 10 * 60 * 1000; // 10 min
        if (isExpired) {
          localStorage.removeItem('session');
          state.user = null;
          state.isAuthenticated = false;
          state.expired = true;
        } else {
          state.user = session.user;
          state.isAuthenticated = true;
          state.expired = false;
        }
      }
    }
  }
});

export const { loginUser, logoutUser, checkSession } = authSlice.actions;
export default authSlice.reducer;
