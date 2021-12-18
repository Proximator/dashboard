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
import {RewardsProvider} from '../src/contexts/RewardsContext'
import '../src/_mockApis';
import '../src/styles/scss/style.scss';
import { BannersProvider } from '@/contexts/BannersContext';

export default function MyApp({ Component, pageProps }: any) {
    return (
        <Provider store={store}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StyledEngineProvider injectFirst>
                    <CssBaseline />
                    <RTLLayout>
                        <Locales>
                            <NavigationScroll>
                                <RewardsProvider>
                                    <BannersProvider>
                                        <Component {...pageProps} />
                                        <Snackbar />
                                    </BannersProvider>
                                </RewardsProvider>
                            </NavigationScroll>
                        </Locales>
                    </RTLLayout>
                </StyledEngineProvider>
            </LocalizationProvider>
        </Provider>
    );
}
