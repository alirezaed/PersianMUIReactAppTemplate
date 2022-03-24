import { styled } from '@mui/material';

export const CheckboxList = styled('div')(() => ({
  display: 'flex',
  flexFlow: 'row',
  flexWrap: 'wrap',
  ' &&& > *': {
    width: '48%',
    marginLeft: 4,
    marginRight: 4,
    marginTop: 4,
    marginBottom: 12
  }
}));
