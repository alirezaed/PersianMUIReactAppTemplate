import * as Yup from 'yup';
import { useEffect, useState, createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { authInstance as axios } from '../../../axios';
import { login } from '../../../store/slices/authSlice';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const phoneRef = createRef();
  const codeRef = createRef();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stage, setStage] = useState('phone');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const LoginSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required(t('PhoneNumberIsRequired'))
      .length(11, t('PhoneNumberFormat')),
    code: Yup.string()
  });

  useEffect(() => {
    setIsSubmitting(false);
    if (codeRef) {
      codeRef.current?.focus();
    } else if (phoneRef) {
      phoneRef.current?.focus();
    }
  }, [stage, codeRef, phoneRef]);
  const submit = (data) => {
    console.log(data);
    setIsSubmitting(true);
    if (stage === 'phone') {
      axios
        .post('/OAuth/PostPhoneAccess', {
          PhoneNumber: String(values.phoneNumber).padStart(11, '0')
        })
        .then((res) => {
          if (res.data.Result === 'Success') {
            setStage('code');
          }
        });
    } else {
      axios
        .post(
          '/OAuth/Token',
          `grant_type=client_credentials&scope=bio&client_id=${String(values.phoneNumber).padStart(
            11,
            '0'
          )}&client_secret=${values.code}`
        )
        .then((res) => {
          dispatch(login({ accessToken: res.data.access_token, fullname: res.data.fullname }));
          navigate('/dashboard/app');
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      code: ''
    },
    validationSchema: LoginSchema,
    onSubmit: submit
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      {stage === 'phone' && (
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="text"
              inputRef={phoneRef}
              disabled={stage === 'code'}
              label={t('PhoneNumber')}
              {...getFieldProps('phoneNumber')}
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
          </Stack>
          <Stack spacing={3} sx={{ mb: 3 }} />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {t('Login')}
          </LoadingButton>
        </Form>
      )}
      {stage === 'code' && (
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="text"
              disabled={stage === 'code'}
              label={t('PhoneNumber')}
              {...getFieldProps('phoneNumber')}
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
            <TextField
              fullWidth
              autoComplete="code"
              type="number"
              inputRef={codeRef}
              label={t('Code')}
              {...getFieldProps('code')}
              error={Boolean(touched.code && errors.code)}
              helperText={touched.code && errors.code}
            />
          </Stack>
          <Stack spacing={3} sx={{ mb: 3 }} />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {t('Login')}
          </LoadingButton>
        </Form>
      )}
    </FormikProvider>
  );
}
