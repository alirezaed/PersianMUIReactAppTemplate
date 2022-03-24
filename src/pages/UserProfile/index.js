import * as React from 'react';
import { useParams } from 'react-router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { apiInstance as axios } from '../../axios';
import { showToast } from '../../store/slices/toastReducer';
import TabPanel from '../../components/TabPanel';
import Transactions from './Transactions';
import Attachments from './Attachments';
import RidePackages from './RidePackages';
import FreeRides from './FreeRides';
import MainInfo from './MainInfo';
import Trips from './Trips';
import PageLoading from '../../components/PageLoading';

export default function UserProfile() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const [profile, setProfile] = React.useState();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetching = async () => {
      const result = await axios.get(`api/adminUsers/profile?user_id=${id}`);
      if (result.data.Result === 'Success') {
        setProfile(result.data.Data.profile);
      } else {
        dispatch(showToast(t('Error')));
      }
    };
    fetching();
  }, [id, dispatch, t]);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  const handleChange = (event, newValue) => {
    setActiveTabIndex(newValue);
  };

  const handleStatusChanged = (newStatus) => {
    setProfile({
      ...profile,
      status: newStatus
    });
  };

  if (!profile) return <PageLoading />;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTabIndex} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={t('MainInfo')} {...a11yProps(0)} />
          <Tab label={t('Trips')} {...a11yProps(1)} />
          <Tab label={t('Documents')} {...a11yProps(2)} />
          <Tab label={t('RidePackages')} {...a11yProps(3)} />
          <Tab label={t('FreeRides')} {...a11yProps(4)} />
          <Tab label={t('Transactions')} {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={activeTabIndex} index={0}>
        <MainInfo
          data={{
            user_id: profile.user_id,
            phone_number: profile.phone_number,
            status: profile.status,
            deposit_credit: profile.account?.deposit_credit,
            wallet_credit: profile.account?.wallet_credit,
            ...profile.profile
          }}
          onStatusChanged={handleStatusChanged}
        />
      </TabPanel>
      <TabPanel value={activeTabIndex} index={1}>
        <Trips trips={profile.trips} />
      </TabPanel>
      <TabPanel value={activeTabIndex} index={2}>
        <Attachments
          userStatus={profile.status}
          attachments={profile.attachments?.details || []}
          userId={profile.user_id}
          onStatusChanged={handleStatusChanged}
        />
      </TabPanel>
      <TabPanel value={activeTabIndex} index={3}>
        <RidePackages ridePackages={profile.ridePackages?.details || []} />
      </TabPanel>
      <TabPanel value={activeTabIndex} index={4}>
        <FreeRides freeRides={profile.freeRides?.details || []} />
      </TabPanel>
      <TabPanel value={activeTabIndex} index={5}>
        <Transactions transactions={profile.transactions?.details || []} />
      </TabPanel>
    </Box>
  );
}
