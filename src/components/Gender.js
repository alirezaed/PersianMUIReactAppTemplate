import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

Gender.propTypes = {
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setFieldValue: PropTypes.func,
  label: PropTypes.string
};

export default function Gender({ value, setFieldValue, ...rest }) {
  const { t } = useTranslation();
  const female = value !== null && value !== undefined && !!value;
  const male = value !== null && value !== undefined && !value;
  return (
    <FormControl component="fieldset" style={{ width: '100%' }}>
      <RadioGroup
        row
        aria-label="gender"
        {...rest}
        onChange={(e, newvalue) => {
          setFieldValue(rest.name, newvalue === 'female');
        }}
      >
        <FormControlLabel value="female" control={<Radio checked={female} />} label={t('Female')} />
        <FormControlLabel value="male" control={<Radio checked={male} />} label={t('Male')} />
      </RadioGroup>
    </FormControl>
  );
}
