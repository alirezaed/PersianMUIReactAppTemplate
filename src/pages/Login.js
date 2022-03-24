// material
import { styled } from '@mui/material/styles';
import { Stack, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

// components
import Page from '../components/Page';
import { LoginForm } from '../components/authentication/login';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const Logo = styled('img')(() => ({
  width: '200px',
  margin: 'auto',
  marginBottom: '70px',
  marginTop: '0px'
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { t } = useTranslation();

  return (
    <RootStyle title={t('Login')}>
      <Container maxWidth="sm">
        <ContentStyle>
          <Logo src="/static/icons/biglogo.svg" />
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              {t('WelcomeToZeero')}
            </Typography>
          </Stack>
          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
