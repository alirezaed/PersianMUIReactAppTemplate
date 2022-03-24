import * as React from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import PropTypes from 'prop-types';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin]
});

RTL.propTypes = {
  children: PropTypes.node
};

export default function RTL({ children }) {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
