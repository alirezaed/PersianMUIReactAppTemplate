import { styled } from '@mui/material';

export const ActionRow = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
  '& > div > *': {
    marginLeft: theme.spacing(0.25),
    marginRight: theme.spacing(0.25)
  }
}));
