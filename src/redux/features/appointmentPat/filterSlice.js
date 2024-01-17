import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredpat: [],
};

const filterSlice = createSlice({
  name: "patfilter",
  initialState,
  reducers: {
    FILTER_PAT(state, action) {
      const { appointments, search } = action.payload;
      const temppat = appointments.filter(
        (appointment) =>
          appointment.doctor.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          appointment.doctor.email
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          appointment.doctor.phone.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredpat = temppat;
    },
  },
});

export const { FILTER_PAT } = filterSlice.actions;

export const selectFilteredpat = (state) => state.patfilter.filteredpat;

export default filterSlice.reducer;
