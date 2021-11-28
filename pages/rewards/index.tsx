import React from 'react';
import { useSelector } from 'react-redux';

// next
import dynamic from 'next/dynamic';

// mui
import { ThemeProvider } from '@mui/material/styles';

// project imports
import themes from '../../src/themes';
import { DefaultRootStateProps } from '../../src/types';
import ProductList from '../../src/views/application/e-commerce/ProductList';

const MainLayout = dynamic(() => import('../../src/layout/MainLayout'), { ssr: false });

const initialRows = [{
    id: 11,
    name: 'hello',
    created: Date.now(),
    description: 'hi',
    offerPrice: 12,
    salePrice: 13,
    status: 'available',
    gender: '',
    inStock: false,
    rating: 5
},{
    id: 12,
    name: 'hello',
    created: Date.now(),
    offerPrice: 12,
    salePrice: 13,
    description: 'hi',
    status: 'available',
    isStock: true,
    rating: 5
}]

export default function PageDashboard() {
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);

    return (
        <ThemeProvider theme={themes(customization)}>
            <MainLayout>
                <ProductList initialRows={initialRows}/>
            </MainLayout>
        </ThemeProvider>
    );
}
