import { styled } from '@mui/material/styles';
import * as React from 'react';
import { CircularProgress } from '@mui/material';

const Root = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
}));

export default function PageLoading() {
  return (
    <Root>
      <CircularProgress />
    </Root>
  );
}
