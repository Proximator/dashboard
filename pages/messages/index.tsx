import React from 'react';
import { useSelector } from 'react-redux';

// next
import dynamic from 'next/dynamic';

// mui
import { ThemeProvider } from '@mui/material/styles';
import { gridSpacing } from 'store/constant';

// project imports
import themes from '../../src/themes';
import { DefaultRootStateProps } from '../../src/types';
import Comp from '../../src/components/pages/messages';
import MainCard from '../../src/ui-component/cards/MainCard';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';

const MainLayout = dynamic(() => import('../../src/layout/MainLayout'), { ssr: false });

export default function PageDashboard() {
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);

    return (
        <ThemeProvider theme={themes(customization)}>
            <MainLayout >
            <MainCard title="Dashboard">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6} md={6} >
                            <TextField select fullWidth label="Client">
                                {['hello', 'hi'].map(e => 
                                    <MenuItem key={e}>{e}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <TextField select fullWidth label="Target Group">
                                {['hello', 'hi'].map(e => 
                                    <MenuItem key={e}>{e}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid item xs={6} md={6} >
                            <TextField fullWidth label="Title"
                            
                            />
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <TextField select fullWidth label="Date De Fin">
                                {['hello', 'hi'].map(e => 
                                    <MenuItem key={e}>{e}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField  fullWidth label="Date De Fin" multiline rows={3}/>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Button fullWidth  variant="outlined">Submit</Button>
                        </Grid>
                    </Grid>
                </MainCard>
            </MainLayout>
        </ThemeProvider>
    );
}
