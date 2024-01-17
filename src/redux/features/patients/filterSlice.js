import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredPat: [],
};

const filterSlice = createSlice({
  name: "filterPat",
  initialState,
  reducers: {
    FILTER_PAT(state, action) {
      const { patients, search } = action.payload;
      const tempPat = patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(search.toLowerCase()) ||
          patient.email.toLowerCase().includes(search.toLowerCase()) ||
          patient.phone.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredPat = tempPat;
    },
  },
});

export const { FILTER_PAT } = filterSlice.actions;

export const selectFilteredPat = (state) => state.filterPat.filteredPat;

export default filterSlice.reducer;
