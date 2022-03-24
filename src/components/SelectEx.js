import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import close from '@iconify/icons-ic/close';

SelectEx.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  name: PropTypes.string,
  options: PropTypes.array,
  fullWidth: PropTypes.bool,
  multiple: PropTypes.bool,
  onClear: PropTypes.func
};

export default function SelectEx({
  label,
  onChange,
  value,
  options,
  name,
  fullWidth,
  onClear,
  multiple,
  ...rest
}) {
  const lableId = `lbl_${name}`;
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel
        id={lableId}
        style={{
          lineHeight: '0.3em',
          overflow: 'unset'
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={lableId}
        id={name}
        name={name}
        value={value}
        label={label}
        onChange={onChange}
        multiple={multiple}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
      {onClear && value && (
        <IconButton onClick={onClear} style={{ position: 'absolute', left: '30px' }}>
          <Icon icon={close} />
        </IconButton>
      )}
    </FormControl>
  );
}
