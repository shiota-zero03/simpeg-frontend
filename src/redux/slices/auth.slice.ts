import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
}

const initialState: AuthState = {
  accessToken: Cookies.get("simpegAccessToken") || null,
  refreshToken: Cookies.get("simpegRefreshToken") || null,
  role: Cookies.get("simpegRole") || "", // Pastikan tidak null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        role: string | null;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.role ?? "";
      
      Cookies.set("simpegAccessToken", action.payload.accessToken, { expires: 7 });
      Cookies.set("simpegRefreshToken", action.payload.refreshToken, { expires: 7 });
      Cookies.set("simpegRole", action.payload.role ?? "", { expires: 7 });
    },
    
    clearAuthTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;

      // Hapus dari Cookies
      Cookies.remove("simpegAccessToken");
      Cookies.remove("simpegRefreshToken");
      Cookies.remove("simpegRole");
    },
  },
});

export const { setAuthTokens, clearAuthTokens } = authSlice.actions;
export default authSlice.reducer;
