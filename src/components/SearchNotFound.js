import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  const { t } = useTranslation();
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1" margin="auto">
        {t('NotFound')} {searchQuery}
      </Typography>
    </Paper>
  );
}
