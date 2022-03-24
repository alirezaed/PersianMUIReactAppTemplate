import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

const ActionRow = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(2)
}));

Actions.propTypes = {
  saveButton: PropTypes.bool,
  returnButton: PropTypes.bool,
  loading: PropTypes.bool
};

export default function Actions({ saveButton, returnButton, loading }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <ActionRow>
      {saveButton && (
        <LoadingButton loading={loading} type="submit">
          {t('Save')}
        </LoadingButton>
      )}
      {returnButton && (
        <Button variant="secondary" onClick={() => navigate(-1)}>
          {t('Return')}
        </Button>
      )}
    </ActionRow>
  );
}
