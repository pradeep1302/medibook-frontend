import { createSlice } from "@reduxjs/toolkit";

const name = JSON.parse(localStorage.getItem("name"));

const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
  role: "",
  id: "",
  user: {
    id: "",
    name: "",
    email: "",
    photo: "",
    phone: "",
    address: "",
    role: "",
    dob: "",
    bio: "",
  },
  patient: {
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_ID(state, action) {
      localStorage.setItem("id", JSON.stringify(action.payload));
      state.id = action.payload;
    },
    SET_ROLE(state, action) {
      localStorage.setItem("role", JSON.stringify(action.payload));
      state.role = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.id = profile.id;
      state.user.email = profile.email;
      state.user.photo = profile.photo;
      state.user.phone = profile.phone;
      state.user.address = profile.address;
      state.user.role = profile.role;
      state.user.dob = profile.dob;
      state.user.bio = profile.bio;
    },
    SET_PAT(state, action) {
      const profile = action.payload;
      state.patient.name = profile.name;
      state.patient.id = profile.id;
      state.patient.email = profile.email;
      state.patient.phone = profile.phone;
      state.patient.address = profile.address;
      state.patient.dob = profile.dob;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER, SET_ROLE, SET_ID, SET_PAT } =
  authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectRole = (state) => state.auth.role;
export const selectId = (state) => state.auth.id;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
