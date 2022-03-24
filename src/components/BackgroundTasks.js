import * as React from 'react';
import { useDispatch } from 'react-redux';
import { updateCounters } from '../store/slices/notifications';
import { apiInstance as axios } from '../axios';

export default function BackgroundTasks() {
  const dispatch = useDispatch();
  const update = React.useCallback(() => {
    axios.get('/api/AdminUsers/InitialData').then((res) => {
      const { pendingTripImages, pendingNationalCards, unreadFeedbacks, pendingMaintenances } =
        res.data.Data;
      dispatch(
        updateCounters({
          pendingTripImagesCount: pendingTripImages,
          pendingNationalCardImagesCount: pendingNationalCards,
          unreadFeedbackCount: unreadFeedbacks,
          pendingMaintenanceCount: pendingMaintenances
        })
      );
    });
  }, [dispatch]);

  React.useEffect(() => {
    update();
    const interval = setInterval(update, 1000 * 15);
    return () => clearInterval(interval);
  }, [update]);

  return null;
}
