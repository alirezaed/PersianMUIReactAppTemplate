import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import ImageEx from './ImageEx';

const Container = styled('div')(() => ({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  top: 0,
  left: 0,
  width: '100vw',
  backgroundColor: '#000000c2',
  zIndex: 3000
}));

ImagePreview.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  ext: PropTypes.string,
  onClose: PropTypes.func
};

export default function ImagePreview({ type, id, ext, onClose, ...rest }) {
  return (
    <Container onClick={onClose}>
      <ImageEx type={type} id={id} ext={ext} onClick={(e) => e.stopPropagation()} {...rest} />
    </Container>
  );
}
