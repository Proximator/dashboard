import React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { jssPreset, StylesProvider } from '@mui/styles';
import { CacheProvider } from '@emotion/react';
import createCache, { StylisPlugin } from '@emotion/cache';

// project imports
import { DefaultRootStateProps } from '../types';

// third-party
import { create } from 'jss';
import rtl from 'jss-rtl';
import rtlPlugin from 'stylis-plugin-rtl';

// ==============================|| RTL LAYOUT ||============================== //

const jss = create({
    plugins: [...jssPreset().plugins, rtl()]
});

export interface RTLLayoutProps {
    children: React.ReactNode;
}

const RTLLayout = ({ children }: RTLLayoutProps) => {
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);
    if (typeof window === 'object' && customization.rtlLayout) {
        document?.querySelector('html')?.setAttribute('dir', 'rtl');
    } else if (typeof window === 'object') {
        document?.querySelector('html')?.removeAttribute('dir');
    }
    const cacheRtl = createCache({
        key: customization.rtlLayout ? 'rtl' : 'css',
        prepend: true,
        stylisPlugins: customization.rtlLayout ? [rtlPlugin as StylisPlugin] : []
    });

    cacheRtl.compat = true;

    return (
        <CacheProvider value={cacheRtl}>
            <StylesProvider jss={jss}>{children}</StylesProvider>
        </CacheProvider>
    );
};

export default RTLLayout;
