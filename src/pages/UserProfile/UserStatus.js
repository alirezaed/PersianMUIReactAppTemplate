import * as React from 'react';
import { IconButton, TextField } from '@mui/material';
import { Icon } from '@iconify/react';
import { Box } from '@mui/system';
import editFill from '@iconify/icons-eva/edit-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import tikFill from '@iconify/icons-eva/checkmark-fill';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import SelectEx from '../../components/SelectEx';
import userStatuses from '../../constants/userStatus';
import { hideLoading, showLoading } from '../../store/slices/loadingSlice';
import { showToast } from '../../store/slices/toastReducer';
import { apiInstance as axios } from '../../axios';

const Row = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  ' &&& > *': {
    marginLeft: 4,
    marginRight: 4,
    marginTop: 4,
    marginBottom: 12
  }
}));

UserStatus.propTypes = {
  defaultStatus: PropTypes.string,
  phoneNumber: PropTypes.string,
  userId: PropTypes.string,
  onStatusChange: PropTypes.func
};

export default function UserStatus({ defaultStatus, phoneNumber, userId, onStatusChange }) {
  const { t } = useTranslation();

  const [editting, setEditting] = React.useState(false);
  const [status, setStatus] = React.useState(defaultStatus);
  const dispatch = useDispatch();

  const toggleEditting = () => {
    setEditting(!editting);
  };

  const handleChangeStatus = () => {
    dispatch(showLoading());
    axios
      .put('api/AdminEditUser/user', { user_id: userId, status })
      .then(() => {
        dispatch(showToast(t('Done')));
        dispatch(hideLoading());
        onStatusChange(status);
      })
      .catch(() => dispatch(showToast(t('Error'))))
      .finally(() => {
        dispatch(hideLoading());
        toggleEditting();
      });
  };

  const handleCancel = () => {
    setStatus(defaultStatus);
    toggleEditting();
  };

  return (
    <Box>
      <Row>
        <TextField
          fullWidth
          type="text"
          size="small"
          label={t('PhoneNumber')}
          disabled
          value={phoneNumber}
        />
        <SelectEx
          fullWidth
          size="small"
          label={t('Status')}
          disabled={!editting}
          onChange={(e) => setStatus(e.target.value)}
          options={userStatuses.map((c) => ({ title: t(c), value: c }))}
          value={status}
        />
      </Row>
      <Row>
        {!editting && (
          <IconButton onClick={toggleEditting} title={t('ChangeStatus')}>
            <Icon icon={editFill} width={20} height={20} />
          </IconButton>
        )}
        {editting && (
          <IconButton onClick={handleChangeStatus}>
            <Icon icon={tikFill} width={20} height={20} color="green" />
          </IconButton>
        )}
        {editting && (
          <IconButton onClick={handleCancel}>
            <Icon icon={closeFill} width={20} height={20} color="red" />
          </IconButton>
        )}
      </Row>
    </Box>
  );
}
