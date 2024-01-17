import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import appointmentService from "./appointmentService";

const initialState = {
  docappointment: null,
  docappointments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Start appointment
export const startAppointment = createAsyncThunk(
  "docappointments/start",
  async ({ formData }, thunkAPI) => {
    try {
      return await appointmentService.startAppointment(formData);
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

// Get all appointment for doctor
export const getAppointmentsDoc = createAsyncThunk(
  "docappointments/getAllDoc",
  async (formData, thunkAPI) => {
    try {
      return await appointmentService.getAppointmentsDoc(formData);
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

// Update appointment
export const updateStatus = createAsyncThunk(
  "docappointments/updateStatus",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await appointmentService.updateStatus(id, formData);
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
  name: "docappointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAppointmentsDoc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointmentsDoc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.docappointments = action.payload;
      })
      .addCase(getAppointmentsDoc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Status changed successfully");
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {} = appointmentSlice.actions;
export const selectIsLoading = (state) => state.docappointment.isLoading;
export const selectdocAppointment = (state) =>
  state.docappointment.docappointment;

export default appointmentSlice.reducer;
