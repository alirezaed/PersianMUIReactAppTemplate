import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { setRTLTextPlugin } from 'mapbox-gl';

// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import RTL from './RTL';
import fa from './locale/fa.json';
import store from './store/store';
import Loading from './components/Loading';
import Toast from './components/Toast';
import Modal from './components/ModalEx';
import BackgroundTasks from './components/BackgroundTasks';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      fa: {
        translation: fa
      }
    },
    lng: 'fa', // if you're using a language detector, do not define the lng option
    fallbackLng: 'fa',

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });
// ------------------------------------------------------------------------
setRTLTextPlugin(
  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
  () => {},
  true
);
export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Provider store={store}>
        <RTL>
          <BackgroundTasks />
          <Loading />
          <Toast />
          <Modal />
          <Router />
        </RTL>
      </Provider>
    </ThemeConfig>
  );
}

export { i18n };
