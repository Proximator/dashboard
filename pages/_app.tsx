import React from 'react';
import { Provider } from 'react-redux';

// mui
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// project import
import { store } from '../src/store';
import Locales from '../src/ui-component/Locales';
import RTLLayout from '../src/ui-component/RTLLayout';
import Snackbar from '../src/ui-component/extended/Snackbar';
import NavigationScroll from '../src/layout/NavigationScroll';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { RewardsProvider } from '../src/contexts/RewardsContext';
import { EmailsProvider } from '../src/contexts/EmailingContext';
import { AuthProvider } from '@/contexts/AuthContext';
import '../src/styles/scss/style.scss';
import { BannersProvider } from '@/contexts/BannersContext';
import { NewsCollectionProvider } from '@/contexts/NewsContext';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StyledEngineProvider injectFirst>
            <CssBaseline />
            <RTLLayout>
              <Locales>
                <NavigationScroll>
                  <RewardsProvider>
                    <EmailsProvider>
                      <BannersProvider>
                        <NewsCollectionProvider>
                          <Component {...pageProps} />
                        </NewsCollectionProvider>
                      </BannersProvider>
                    </EmailsProvider>
                    <Snackbar />
                  </RewardsProvider>
                </NavigationScroll>
              </Locales>
            </RTLLayout>
          </StyledEngineProvider>
        </LocalizationProvider>
      </Provider>
    </AuthProvider>
  );
}
