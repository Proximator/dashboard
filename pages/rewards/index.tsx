import React from 'react';
import { useSelector } from 'react-redux';

// next
import dynamic from 'next/dynamic';

// mui
import { ThemeProvider } from '@mui/material/styles';

// project imports
import themes from '../../src/themes';
import { DefaultRootStateProps } from '../../src/types';
import Product from '../../src/components/pages/rewards';

const MainLayout = dynamic(() => import('../../src/layout/MainLayout'), { ssr: false });

export default function PageDashboard() {
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);

    return (
        <ThemeProvider theme={themes(customization)}>
            <MainLayout >
                <Product />
            </MainLayout>
        </ThemeProvider>
    );
}
