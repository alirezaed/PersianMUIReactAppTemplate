// material
import { Box, Grid, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageLoading from '../components/PageLoading';
// components
import Page from '../components/Page';
import ActiveUsers from '../components/_dashboard/ActiveUsers';
import NavganVehicles from '../components/_dashboard/NavganVehicles';
import TodayRideTime from '../components/_dashboard/TodayRideTime';
import TodayRideCount from '../components/_dashboard/TodayRideCount';
import TripsHistory from '../components/_dashboard/TripsHistory';
import UserStatusHistory from '../components/_dashboard/UserStatusHistory';
import { apiInstance as axios } from '../axios';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const { t } = useTranslation();
  const [data, setData] = useState();
  const [userStatusHistory, setUserStatusHistory] = useState();

  useEffect(() => {
    const p1 = axios.get('api/reports');
    const p2 = axios.get('api/reports/UserStatusHistory');
    Promise.all([p1, p2]).then(([res1, res2]) => {
      setData(res1.data.Data);
      setUserStatusHistory(res2.data.Data);
    });
  }, []);

  if (!data || !userStatusHistory) return <PageLoading />;
  const today = data[data.length - 1];
  return (
    <Page title={t('Dashboard')}>
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">{t('HiWelcomeback')}</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <ActiveUsers count={today.ActiveUserCount} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <NavganVehicles count={today.ActiveVehicleCount} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TodayRideTime count={today.TotalActiveMinutes} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TodayRideCount count={today.RidedVehicleCount} />
          </Grid>

          <Grid item xs={12}>
            <TripsHistory data={data} />
          </Grid>

          <Grid item xs={12}>
            <UserStatusHistory data={userStatusHistory} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
