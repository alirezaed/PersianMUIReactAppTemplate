import { styled } from '@mui/material';

export const FormRow = styled('div')(() => ({
  display: 'flex',
  ' &&& > *': {
    marginLeft: 4,
    marginRight: 4,
    marginTop: 4,
    marginBottom: 12
  }
}));
