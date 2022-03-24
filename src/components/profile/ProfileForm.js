import * as React from 'react';
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Form, FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import JalaliDatepicker from '../JalaliDatePicker';
import Gender from '../Gender';
import { apiInstance as axios } from '../../axios';
import { showToast } from '../../store/slices/toastReducer';
import { showLoading, hideLoading } from '../../store/slices/loadingSlice';
import Actions from './Actions';

const Row = styled('div')(() => ({
  display: 'flex',
  ' &&& > *': {
    marginLeft: 4,
    marginRight: 4,
    marginTop: 4,
    marginBottom: 12
  }
}));

ProfileForm.propTypes = {
  initData: PropTypes.object
};

export default function ProfileForm({ initData }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const FormSchema = Yup.object().shape({
    name: Yup.string().required(t('ThisFieldIsRequired')),
    last_name: Yup.string().required(t('ThisFieldIsRequired')),
    national_code: Yup.string().required(t('ThisFieldIsRequired')).length(10, t('ShouldBe10Chars')),
    birth_date: Yup.date().required(t('ThisFieldIsRequired')),
    gender: Yup.boolean(),
    email: Yup.string().email(t('EnterAValidEmail'))
  });

  const submit = (data) => {
    dispatch(showLoading());
    axios
      .put('/api/AdminEditUser/profile', {
        profile: {
          ...data
        }
      })
      .then(() => {
        dispatch(showToast(t('Saved')));
      })
      .catch((er) => {
        console.error(er);
        dispatch(showToast(t('Error')));
      })
      .finally(() => dispatch(hideLoading()));
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      last_name: '',
      national_code: '',
      birth_date: '',
      gender: '',
      email: ''
    },
    validationSchema: FormSchema,
    onSubmit: submit
  });

  const { errors, touched, values, handleSubmit, getFieldProps, setFieldValue, setValues } = formik;
  React.useEffect(() => {
    if (initData) {
      setValues({
        ...initData,
        email: initData.email == null ? undefined : initData.email
      });
    } else {
      console.error('initData is null');
    }
  }, [initData, setValues]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Row>
          <TextField
            fullWidth
            autoComplete="name"
            type="text"
            size="small"
            label={t('Firstname')}
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            fullWidth
            autoComplete="lastname"
            type="text"
            size="small"
            label={t('Lastname')}
            {...getFieldProps('last_name')}
            error={Boolean(touched.last_name && errors.last_name)}
            helperText={touched.last_name && errors.last_name}
          />
        </Row>
        <Row>
          <JalaliDatepicker
            fullWidth
            autoComplete="birthDate"
            type="text"
            size="small"
            label={t('BirthDate')}
            name="birth_date"
            setFieldValue={setFieldValue}
            value={values.birth_date}
            error={Boolean(touched.birth_date && errors.birth_date)}
            helperText={touched.birth_date && errors.birth_date}
          />
          <TextField
            fullWidth
            autoComplete="national_code"
            type="text"
            size="small"
            label={t('NationalCode')}
            {...getFieldProps('national_code')}
            error={Boolean(touched.national_code && errors.national_code)}
            helperText={touched.national_code && errors.national_code}
          />
        </Row>
        <Row>
          <TextField
            fullWidth
            autoComplete="email"
            type="text"
            size="small"
            label={t('Email')}
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <Gender
            autoComplete="gender"
            type="text"
            size="small"
            name="gender"
            label={t('Gender')}
            setFieldValue={setFieldValue}
            value={values.gender}
          />
        </Row>
        <Actions saveButton returnButton />
      </Form>
    </FormikProvider>
  );
}
