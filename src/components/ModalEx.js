import { Typography, Modal, Divider, Button, Box } from '@mui/material';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { closeModal } from '../store/slices/modalSlice';

const ModalBox = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  backgroundColor: 'white',
  borderRadius: theme.spacing(1),
  boxShadow: '0 2px 11px 1px',
  padding: theme.spacing(2),
  paddingTop: theme.spacing(2)
}));

export default function ModalEx() {
  const { t } = useTranslation();
  const { open, title, content, onOK, onCancel, okTitle, cancelTitle, onClose } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    if (onClose) onClose();
    dispatch(closeModal());
  };

  const handleOK = () => {
    onOK();
    dispatch(closeModal());
  };
  const handleCancel = () => {
    onCancel();
    dispatch(closeModal());
  };
  return (
    <Modal
      dir="rtl"
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox>
        <Box style={{ position: 'relative' }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: '8px' }}
          >
            {title}
          </Typography>
          <Divider style={{ marginBottom: '8px' }} />
          <Box>{content}</Box>
          <Box>
            {onOK && (
              <Button variant="primary" onClick={handleOK}>
                {t(okTitle || 'OK')}
              </Button>
            )}
            {onCancel && (
              <Button variant="secondary" onClick={handleCancel}>
                {t(cancelTitle || 'Cancel')}
              </Button>
            )}
          </Box>
        </Box>
      </ModalBox>
    </Modal>
  );
}
