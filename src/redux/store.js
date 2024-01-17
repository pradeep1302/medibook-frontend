import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import reportReducer from "../redux/features/report/reportSlice";
import filterReducer from "./features/report/filterSlice";
import filterReducerPat from "./features/appointmentPat/filterSlice";
import filterReducerPatients from "./features/patients/filterSlice";
import filterReducerDoc from "./features/appointmentDoc/filterSlice";
import docappointmentReducer from "./features/appointmentDoc/appointmentSlice";
import patappointmentReducer from "./features/appointmentPat/appointmentSlice";
import patientReducer from "./features/patients/patientSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
    filter: filterReducer,
    patfilter: filterReducerPat,
    filterPat: filterReducerPatients,
    docfilter: filterReducerDoc,
    docappointment: docappointmentReducer,
    patappointment: patappointmentReducer,
    patient: patientReducer,
  },
});
