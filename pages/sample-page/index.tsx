import React from 'react';
import { useSelector } from 'react-redux';

// mui
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';

// next
import dynamic from 'next/dynamic';

// project
import themes from '../../src/themes';
import { DefaultRootStateProps } from '../../src/types';
import MainCard from 'ui-component/cards/MainCard';

const MainLayout = dynamic(() => import('../../src/layout/MainLayout'), { ssr: false });

export default function Dashboard() {
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);

    return (
        <ThemeProvider theme={themes(customization)}>
            <MainLayout>
                <MainCard title="Sample Page">
                    <Typography variant="body2">This is sample page</Typography>
                </MainCard>
            </MainLayout>
        </ThemeProvider>
    );
}
