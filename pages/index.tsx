import React from 'react';
import { useSelector } from 'react-redux';

// next
import dynamic from 'next/dynamic';

// mui
import { ThemeProvider } from '@mui/material/styles';

// project imports
import themes from '../src/themes';
import { DefaultRootStateProps } from '../src/types';

const PagesLanding = dynamic(() => import('../src/landing'));
const PageLayout = dynamic(() => import('../src/layout'), { ssr: false });

function IndexPage() {
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);

    return (
        <>
            <ThemeProvider theme={themes(customization)}>
                <PageLayout>
                    <PagesLanding />
                </PageLayout>
            </ThemeProvider>
        </>
    );
}

export default IndexPage;
