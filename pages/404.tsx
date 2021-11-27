import React from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

// project imports
import config from '../src/config';
import themes from '../src/themes';
import AnimateButton from '../src/ui-component/extended/AnimateButton';
import { gridSpacing } from '../src/store/constant';
import { DefaultRootStateProps } from '../src/types';

// assets
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

const PageLayout = dynamic(() => import('../src/layout'));

// styles
const CardMediaWrapper = styled('div')({
    maxWidth: 720,
    margin: '0 auto',
    position: 'relative'
});

const ErrorWrapper = styled('div')({
    maxWidth: 350,
    margin: '0 auto',
    textAlign: 'center'
});

const ErrorCard = styled(Card)({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const CardMediaBlock = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '3s bounce ease-in-out infinite'
});

const CardMediaBlue = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '15s wings ease-in-out infinite'
});

const CardMediaPurple = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '12s wings ease-in-out infinite'
});

// ==============================|| ERROR PAGE ||============================== //

const Error = () => {
    const theme = useTheme();
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);

    return (
        <ThemeProvider theme={themes(customization)}>
            <PageLayout>
                <ErrorCard>
                    <CardContent>
                        <Grid container justifyContent="center" spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <CardMediaWrapper>
                                    <CardMedia
                                        component="img"
                                        image={
                                            theme.palette.mode === 'dark'
                                                ? '/images/maintenance/img-error-bg-dark.svg'
                                                : '/images/maintenance/img-error-bg.svg'
                                        }
                                        title="Slider5 image"
                                    />
                                    <CardMediaBlock src="/images/maintenance/img-error-text.svg" title="Slider 1 image" />
                                    <CardMediaBlue src="/images/maintenance/img-error-blue.svg" title="Slider 2 image" />
                                    <CardMediaPurple src="/images/maintenance/img-error-purple.svg" title="Slider 3 image" />
                                </CardMediaWrapper>
                            </Grid>
                            <Grid item xs={12}>
                                <ErrorWrapper>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={12}>
                                            <Typography variant="h1" component="div">
                                                Something is wrong
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">
                                                The page you are looking was moved, removed, renamed, or might never exist!{' '}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AnimateButton>
                                                <Button variant="contained" size="large" href={config.defaultPath}>
                                                    <HomeTwoToneIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} /> Home
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </ErrorWrapper>
                            </Grid>
                        </Grid>
                    </CardContent>
                </ErrorCard>
            </PageLayout>
        </ThemeProvider>
    );
};

export default Error;
