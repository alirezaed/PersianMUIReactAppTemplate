import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

// material
import { Stack, Container, Typography, TextField, Box, Button, Card, styled } from '@mui/material';
// import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import creditCardFill from '@iconify/icons-eva/credit-card-fill';
import editFill from '@iconify/icons-eva/edit-fill';
import { FormikProvider, Form, useFormik } from 'formik';
// components
import Page from '../../components/Page';

import { apiInstance as axios } from '../../axios';
import TableEx from '../../components/TableEx/Table';
import { showLoading, hideLoading } from '../../store/slices/loadingSlice';
import { showToast } from '../../store/slices/toastReducer';
import { openModal } from '../../store/slices/modalSlice';
import ChargeForm from '../../components/profile/ChargeForm';
import { praperUserList } from '../../common/mapper';
import { FormRow } from '../../components/Forms/FormRow';
import SelectEx from '../../components/SelectEx';
import { getEnumItems } from '../../common/enumerations';
import { ActionRow } from '../../components/Forms/ActionRow';
// ---------------------------------------------------------------------

const SearchBox = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3)
}));

export default function User() {
  const { t } = useTranslation();
  const [users, setUsers] = useState();
  const [total, setTotal] = useState();
  const dispatch = useDispatch();
  const { type } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState({
    query: '',
    page: -1,
    limit: 10,
    statuses: ''
  });

  const praperUsers = useCallback(praperUserList, [t]);

  useEffect(() => {
    if (searchQuery.page < 0) return;
    setUsers();
    axios
      .get(
        `api/adminUsers/find?type=${type}&query=${searchQuery.query}&userStatuses=${searchQuery.statuses}&page=${searchQuery.page}&limit=${searchQuery.limit}&sortField=${searchQuery.sortField}&sortOrder=${searchQuery.sortOrder}`
      )
      .then((res) => {
        if (res.data.Result === 'Success') {
          setUsers(praperUsers(res.data.Data.users, t));
          setTotal(res.data.Data.total);
        }
      });
  }, [searchQuery, praperUsers, t, type]);

  /* const handleRemoveUser = (user) => {
    dispatch(showLoading());
    axios
      .delete(`api/AdminDeleteEntireUser?userId=${user.user_id}`)
      .then((res) => {
        if (res.data.Result === 'success') {
          dispatch(showToast(t('Done')));
        } else {
          dispatch(showToast(t('Error')));
        }
      })
      .catch(() => dispatch(showToast(t('Error'))))
      .finally(() => dispatch(hideLoading()));
  }; */

  const handleViewProfile = (user) => {
    navigate(`/dashboard/userprofile/${user.user_id}`);
  };

  const handleCharge = (row) => {
    dispatch(
      openModal({
        title: t('ChargeOrPenalty'),
        content: <ChargeForm userId={row.user_id} />
      })
    );
  };

  const handleChangeStatusToNew = (row) => {
    dispatch(showLoading());
    axios
      .put('api/AdminEditUser/user', { user_id: row.user_id, status: 'new_user_verified' })
      .then(() => {
        dispatch(showToast(t('Done')));
        const uIndex = users.findIndex((c) => c.user_id === row.user_id);
        users[uIndex].status = 'new_user_verified';
        users[uIndex].statusPersian = t('new_user_verified');
        setUsers([...users]);
      })
      .catch(() => dispatch(showToast(t('Error'))))
      .finally(() => dispatch(hideLoading()));
  };

  const columns = [
    {
      field: 'create_date',
      label: t('CreateDate'),
      align: 'center',
      jalalDate: true,
      sortable: true
    },
    { field: 'fullName', label: t('Name'), align: 'center', sortable: false },
    { field: 'phone_number', label: t('PhoneNumber'), align: 'center', sortable: true },
    type === '2'
      ? undefined
      : { field: 'role', label: t('Role'), align: 'center', sortable: false },
    { field: 'statusPersian', label: t('Status'), align: 'center', sortable: false },
    { field: '' }
  ];

  const moreActions = [];
  moreActions.push({ icon: editFill, label: t('ViewProfile'), clickHandler: handleViewProfile });
  if (type === '2') {
    moreActions.push({
      icon: creditCardFill,
      label: t('ChargeOrPenalty'),
      clickHandler: handleCharge
    });
    moreActions.push({
      icon: creditCardFill,
      label: t('ChangeStatusToNew'),
      clickHandler: handleChangeStatusToNew,
      show: (row) => row.status.includes('inquiry')
    });
  }

  const handleRefresh = useCallback(({ page, rowsPerPage, orderBy, order }) => {
    setSearchQuery((p) => ({
      ...p,
      page,
      limit: rowsPerPage,
      sortField: orderBy,
      sortOrder: order
    }));
  }, []);

  const submit = ({ query, statuses }) => {
    setSearchQuery((p) => ({ ...p, query, statuses: statuses.join(',') }));
  };

  const formik = useFormik({
    initialValues: {
      query: '',
      statuses: []
    },
    onSubmit: submit
  });

  const { getFieldProps, handleSubmit } = formik;

  const statusList = getEnumItems('userStatus');
  return (
    <Page title={t('ManageUsers')}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {t('ManageUsers')}
          </Typography>
        </Stack>
        <SearchBox>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <TextField
                  fullWidth
                  {...getFieldProps('query')}
                  label={t('PhoneOrName')}
                  size="small"
                />
                <SelectEx
                  fullWidth
                  label={t('Status')}
                  {...getFieldProps('statuses')}
                  size="small"
                  options={statusList}
                  multiple
                />
              </FormRow>
              <ActionRow>
                <Box />
                <Box>
                  <Button type="submit">{t('Search')}</Button>
                </Box>
              </ActionRow>
            </Form>
          </FormikProvider>
        </SearchBox>
        <TableEx
          columns={columns.filter((c) => !!c)}
          data={users || []}
          totalCount={total || 0}
          keyField="user_id"
          moreActions={moreActions}
          loading={!users}
          defaultSortField="create_date"
          defaultSortOrder="desc"
          onRefresh={handleRefresh}
        />
      </Container>
    </Page>
  );
}
