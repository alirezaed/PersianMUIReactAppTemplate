import * as React from 'react';
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Form, FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { apiInstance as axios } from '../../axios';
import { showToast } from '../../store/slices/toastReducer';
import { closeModal } from '../../store/slices/modalSlice';
import Actions from './Actions';
import SelectEx from '../SelectEx';

const Row = styled('div')(() => ({
  display: 'flex',
  ' &&& > *': {
    marginLeft: 4,
    marginRight: 4,
    marginTop: 4,
    marginBottom: 12
  }
}));

ChargeForm.propTypes = {
  userId: PropTypes.string
};
export default function ChargeForm({ userId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const FormSchema = Yup.object().shape({
    type: Yup.string().required(t('ThisFieldIsRequired')),
    amount: Yup.number().required(t('ThisFieldIsRequired')),
    description: Yup.string()
  });
  const [submitting, setSubmitting] = React.useState(false);

  const submit = (data) => {
    setSubmitting(true);
    axios
      .put('/api/AdminEditUser/account', {
        user: {
          id: userId
        },
        CustomTransaction: {
          Type: data.type,
          Amount: data.amount,
          Description: data.description
        }
      })
      .then(() => {
        setSubmitting(false);
        dispatch(closeModal());
        dispatch(showToast(t('Saved')));
      })
      .catch((er) => {
        console.error(er);
        dispatch(showToast(t('Error')));
      });
  };

  const formik = useFormik({
    initialValues: {
      type: '',
      amount: '',
      description: ''
    },
    validationSchema: FormSchema,
    onSubmit: submit
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Row>
          <SelectEx
            fullWidth
            size="small"
            label={t('Type')}
            options={[
              { value: 'prize', title: t('Prize') },
              { value: 'penalty', title: t('Penalty') }
            ]}
            {...getFieldProps('type')}
            error={Boolean(touched.type && errors.type)}
            helperText={touched.type && errors.type}
          />
        </Row>
        <Row>
          <TextField
            fullWidth
            autoComplete="amount"
            type="number"
            size="small"
            label={t('Amount')}
            {...getFieldProps('amount')}
            error={Boolean(touched.amount && errors.amount)}
            helperText={touched.amount && errors.amount}
          />
        </Row>
        <Row>
          <TextField
            fullWidth
            autoComplete="description"
            type="text"
            size="small"
            label={t('Description')}
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />
        </Row>
        <Actions saveButton loading={submitting} />
      </Form>
    </FormikProvider>
  );
}
