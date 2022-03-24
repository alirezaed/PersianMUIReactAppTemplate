import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@mui/material';
import { hideToast } from '../store/slices/toastReducer';

export default function Toast() {
  const { show, message } = useSelector((state) => state.toast);
  const dispach = useDispatch();
  return (
    <Snackbar
      open={show}
      autoHideDuration={4000}
      onClose={() => dispach(hideToast())}
      message={message}
    />
  );
}
