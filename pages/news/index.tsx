import React from 'react';
import { useSelector } from 'react-redux';

// next
import dynamic from 'next/dynamic';

// mui
import { ThemeProvider } from '@mui/material/styles';

// project imports
import themes from '../../src/themes';
import { DefaultRootStateProps } from '../../src/types';
import News from '../../src/components/pages/news';
import { withAuth } from '@/contexts/AuthContext';

const MainLayout = dynamic(() => import('../../src/layout/MainLayout'), { ssr: false });

function PageDashboard() {
  const customization = useSelector((state: DefaultRootStateProps) => state.customization);

  return (
    <ThemeProvider theme={themes(customization)}>
      <MainLayout>
        <News />
      </MainLayout>
    </ThemeProvider>
  );
}

export default withAuth(PageDashboard);
