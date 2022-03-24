import PropTypes from 'prop-types';

import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

// ----------------------------------------------------------------------
MoreMenu.propTypes = {
  moreActions: PropTypes.array,
  row: PropTypes.object
};

export default function MoreMenu({ moreActions, row }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (row, cb) => {
    setIsOpen(false);
    cb(row);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {moreActions
          .filter((c) => !c.show || c.show(row))
          .map((item) => (
            <MenuItem
              key={item.label}
              sx={{ color: 'text.secondary' }}
              onClick={() => handleClick(row, item.clickHandler)}
            >
              <ListItemIcon>
                <Icon icon={item.icon} width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}
