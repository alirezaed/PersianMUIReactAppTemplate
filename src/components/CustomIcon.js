import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

CustomIcon.propTypes = {
  name: PropTypes.string,
  sx: PropTypes.object
};

export default function CustomIcon({ sx, name, ...rest }) {
  const filename = `/static/icons/${name}.svg`;
  return <Box component="img" src={filename} sx={{ width: 30, height: 30, ...sx }} {...rest} />;
}
