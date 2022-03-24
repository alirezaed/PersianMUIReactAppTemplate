import * as React from 'react';
import { Card, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import ProfileForm from '../../components/profile/ProfileForm';
import { apiInstance as axios } from '../../axios';
import { showToast } from '../../store/slices/toastReducer';
import PageLoading from '../../components/PageLoading';

export default function PersonalProfile() {
  const [data, setData] = React.useState();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  React.useEffect(() => {
    axios
      .get(`/api/profile`)
      .then((res) => {
        setData(res.data.Data);
      })
      .catch(() => dispatch(showToast(t('Error'))));
  }, [dispatch, t]);

  if (!data) return <PageLoading />;
  return (
    <Card style={{ padding: 20 }}>
      <Stack style={{ marginBottom: 20 }}>{t('PersonalProfile')}</Stack>
      <ProfileForm initData={data} />
    </Card>
  );
}
