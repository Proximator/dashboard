import React from 'react';
import { useSelector } from 'react-redux';

// next
import dynamic from 'next/dynamic';

// mui
import { ThemeProvider, useTheme, styled } from '@mui/material/styles';

// project imports
import themes from '../src/themes';
import { DefaultRootStateProps } from '../src/types';

const PageLayout = dynamic(() => import('../src/layout'), { ssr: false });
import MainCard from '../src/ui-component/cards/MainCard';
import JWTLogin from '../src/views/pages/authentication/login/JWTLogin';
import { Divider, Grid, Stack, Typography, useMediaQuery, Box } from '@mui/material';
import Logo from '@/ui-component/Logo';

const AuthCardWrapper = ({ children, ...other }) => (
    <MainCard
        sx={{
            maxWidth: { xs: 400, lg: 475 },
            margin: { xs: 2.5, md: 3 },
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            }
        }}
        content={false}
        {...other}
    >
        <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
    </MainCard>
);
const AuthWrapper1 = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.light,
    minHeight: '100vh'
}));
const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AuthWrapper1>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ minHeight: '100vh' }}>
                <Grid item container justifyContent="center"  sx={{ my: 3 }}>
                    <AuthCardWrapper>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction={matchDownSM ? 'column-reverse' : 'row'}
                                    alignItems={matchDownSM ? 'center' : 'inherit'}
                                    justifyContent={matchDownSM ? 'center' : 'space-between'}
                                >
                                    <Grid item>
                                        <Stack
                                            justifyContent={matchDownSM ? 'center' : 'flex-start'}
                                            textAlign={matchDownSM ? 'center' : 'inherit'}
                                        >
                                            <Typography
                                                color={theme.palette.secondary.main}
                                                gutterBottom
                                                variant={matchDownSM ? 'h3' : 'h2'}
                                            >
                                                Hi, Welcome Back
                                            </Typography>
                                            <Typography color="textPrimary" gutterBottom variant="h4">
                                                Login in to your account
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item sx={{ mb: { xs: 3, sm: 0 } }}>
                                        {/* <MuiLink to="#"> */}
                                            <Logo />
                                        {/* </MuiLink> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <JWTLogin loginProp={1} />
                                {/* <div>hello</div> */}
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                        </Grid>
                    </AuthCardWrapper>
                </Grid>
                {/* <Grid item md={6} lg={5} sx={{ position: 'relative', alignSelf: 'stretch', display: { xs: 'none', md: 'block' } }}>
                    <BackgroundPattern1>
                        <Grid item container alignItems="flex-end" justifyContent="center" spacing={3}>
                            <Grid item xs={12}>
                                <span />
                                <PurpleWrapper />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item container justifyContent="center" sx={{ pb: 8 }}>
                                    <Grid item xs={10} lg={8} sx={{ '& .slick-list': { pb: 2 } }}>
                                        <AuthSlider items={items} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </BackgroundPattern1>
                </Grid> */}
            </Grid>
        </AuthWrapper1>
    );
};


function IndexPage() {
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);

    return (
        <>
            <ThemeProvider theme={themes(customization)}>
                <PageLayout>
                    <Login />
                </PageLayout>
            </ThemeProvider>
        </>
    );
}

export default IndexPage;
