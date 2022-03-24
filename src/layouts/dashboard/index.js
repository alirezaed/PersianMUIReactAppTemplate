import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const RootMainStyle = styled('div')(() => ({
  display: 'flex',
  flexFlow: 'column',
  width: '100%',
  height: '100vh'
}));

const MainStyle = styled('div')(({ theme, ismap }) => ({
  flexGrow: 1,
  paddingTop: ismap ? 0 : 24,
  paddingBottom: ismap ? 0 : theme.spacing(10),
  overflow: 'auto',
  [theme.breakpoints.up('lg')]: {
    paddingTop: ismap ? 0 : 24,
    paddingLeft: ismap ? 0 : theme.spacing(2),
    paddingRight: ismap ? 0 : theme.spacing(2)
  }
}));

const HeaderFillerStyle = styled('div')(({ theme }) => ({
  lineHeight: `${APP_BAR_MOBILE}px`,
  [theme.breakpoints.up('lg')]: {
    lineHeight: `${APP_BAR_DESKTOP}px`
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <RootMainStyle>
        <HeaderFillerStyle>&nbsp</HeaderFillerStyle>
        <MainStyle ismap={pathname.endsWith('mapstatus') ? 'ismap' : undefined}>
          <Outlet />
        </MainStyle>
      </RootMainStyle>
    </RootStyle>
  );
}
