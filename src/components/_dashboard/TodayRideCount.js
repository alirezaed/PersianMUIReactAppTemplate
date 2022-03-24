import { Icon } from '@iconify/react';
import smiling from '@iconify/icons-eva/smiling-face-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// utils
import { fShortenNumber } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

TodayRideTime.propTypes = {
  count: PropTypes.number
};

export default function TodayRideTime({ count }) {
  const { t } = useTranslation();
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={smiling} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(count)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {t('TodayRideCount')}
      </Typography>
    </RootStyle>
  );
}
