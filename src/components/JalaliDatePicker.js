import { DatePicker, LocalizationProvider } from '@mui/lab';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@date-io/date-fns-jalali';
import PropTypes from 'prop-types';

JalaliDatepicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  setFieldValue: PropTypes.func,
  label: PropTypes.string
};

export default function JalaliDatepicker({ value, setFieldValue, label, ...rest }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        mask="____/__/__"
        onChange={(newvalue) => {
          setFieldValue(rest.name, newvalue);
        }}
        value={value}
        label={label}
        renderInput={(params) => <TextField {...params} {...rest} />}
      />
    </LocalizationProvider>
  );
}
