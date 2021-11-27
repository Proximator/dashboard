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
import '../src/_mockApis';
import '../src/styles/scss/style.scss';

export default function MyApp({ Component, pageProps }: any) {
    return (
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <CssBaseline />
                <RTLLayout>
                    <Locales>
                        <NavigationScroll>
                            <>
                                <Component {...pageProps} />
                                <Snackbar />
                            </>
                        </NavigationScroll>
                    </Locales>
                </RTLLayout>
            </StyledEngineProvider>
        </Provider>
    );
}
