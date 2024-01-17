import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import patientService from "./patientService";

const initialState = {
  patient: null,
  patients: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all patients for doctor
export const getPatients = createAsyncThunk(
  "patients/getAll",
  async (_, thunkAPI) => {
    try {
      return await patientService.getPatients();
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

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPatients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.patients = action.payload;
      })
      .addCase(getPatients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {} = patientSlice.actions;
export const selectIsLoading = (state) => state.patient.isLoading;
export const selectPatient = (state) => state.patient.patient;

export default patientSlice.reducer;
