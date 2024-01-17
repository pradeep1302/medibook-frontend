import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { makeStyles } from "@mui/material";

export default function DatePickermui({ formData, setformData, label }) {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          sx={{
            label: {
              fontSize: "15px",
              backgroundColor: "white",
              padding: "0px 10px",
            },
            div: {
              fontSize: "20px",
            },
          }}
          value={dayjs(formData.date)}
          onChange={(newValue) =>
            setformData({ ...formData, date: newValue.$d })
          }
          format="DD/MM/YYYY"
        />
      </LocalizationProvider>
    </div>
  );
}
