import { Card, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import ProfileForm from '../../components/profile/ProfileForm';
import UserStatus from './UserStatus';

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

const HeaderRow = styled('div')(() => ({
  paddingLeft: 6,
  paddingRight: 6,
  marginBottom: 4
}));

const CardContainer = styled(Card)(() => ({
  padding: '20px',
  marginBottom: '10px'
}));

MainInfo.propTypes = {
  data: PropTypes.object,
  onStatusChanged: PropTypes.func
};

export default function MainInfo({ data, onStatusChanged }) {
  const { t } = useTranslation();

  return (
    <>
      <CardContainer>
        <UserStatus
          phoneNumber={data.phone_number}
          defaultStatus={data.status}
          userId={data.user_id}
          onStatusChange={onStatusChanged}
        />
      </CardContainer>
      <CardContainer>
        <Row>
          <TextField
            fullWidth
            type="text"
            size="small"
            label={t('Deposit')}
            disabled
            value={data.deposit_credit}
          />
          <TextField
            fullWidth
            type="text"
            size="small"
            label={t('Wallet')}
            disabled
            value={data.wallet_credit}
          />
        </Row>
      </CardContainer>
      <CardContainer>
        <HeaderRow>{t('Profile')}</HeaderRow>
        <ProfileForm initData={data} />
      </CardContainer>
    </>
  );
}
