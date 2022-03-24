import { CircularProgress } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';

export default function Loading() {
  const loading = useSelector((state) => state.loading.show);
  if (!loading) return null;
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
