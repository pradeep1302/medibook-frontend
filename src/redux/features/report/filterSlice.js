import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredReports: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_REPORTS(state, action) {
      const { reports, search } = action.payload;
      const tempReports = reports.filter((report) =>
        report.doctor.name.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredReports = tempReports;
    },
  },
});

export const { FILTER_REPORTS } = filterSlice.actions;

export const selectFilteredReports = (state) => state.filter.filteredReports;

export default filterSlice.reducer;
