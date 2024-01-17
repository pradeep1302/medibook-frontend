import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import appointmentService from "./appointmentService";

const initialState = {
  patappointment: null,
  patappointments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all appointment for patient
export const getAppointmentsPat = createAsyncThunk(
  "patappointments/getAllPat",
  async (_, thunkAPI) => {
    try {
      return await appointmentService.getAppointmentsPat();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const appointmentSlice = createSlice({
  name: "patappointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAppointmentsPat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointmentsPat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.patappointments = action.payload;
      })
      .addCase(getAppointmentsPat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {} = appointmentSlice.actions;
export const selectIsLoading = (state) => state.patappointment.isLoading;
export const selectpatAppointment = (state) =>
  state.patappointment.patappointment;

export default appointmentSlice.reducer;
