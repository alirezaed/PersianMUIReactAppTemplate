import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

ImageEx.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  ext: PropTypes.string
};

export default function ImageEx({ type, id, ext, ...rest }) {
  if (!id) return null;
  const imageIdParts = id.split('.');
  const imageName = imageIdParts.length > 1 ? id.substring(0, id.lastIndexOf('.')) : id;
  const extention = imageIdParts.length > 1 ? imageIdParts[imageIdParts.length - 1] : ext || 'jpg';

  return (
    <Box
      component="img"
      src={`${process.env.REACT_APP_API_BASE_URL}/image/${type}/${imageName}/${extention}`}
      {...rest}
    />
  );
}
