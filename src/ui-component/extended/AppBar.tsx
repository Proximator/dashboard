import React, { ReactElement } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    AppBar as MuiAppBar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    Link as MuiLink,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
    useScrollTrigger
} from '@mui/material';

// project imports
import Logo from '../Logo';

// assets
import { IconBook, IconCreditCard, IconDashboard, IconHome2 } from '@tabler/icons';
import MenuIcon from '@mui/icons-material/Menu';

// elevation scroll
export interface ElevationScrollProps {
    children: ReactElement;
    window?: Window | Node;
}
function ElevationScroll(props: ElevationScrollProps) {
    const { children, window } = props;
    const theme = useTheme();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window!
    });
    const darkBorder = theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.grey[200];

    return React.cloneElement(children, {
        elevation: trigger ? 2 : 0,
        style: {
            backgroundColor: theme.palette.background.default,
            borderBottom: trigger ? 'none' : '1px solid',
            borderColor: trigger ? '' : darkBorder,
            color: theme.palette.text.dark
        }
    });
}

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const AppBar = ({ ...others }) => {
    const [drawerToggle, setDrawerToggle] = React.useState<boolean>(false);
    /** Method called on multiple components with different event types */
    const drawerToggler = (open: boolean) => (event: any) => {
        if (event.type! === 'keydown' && (event.key! === 'Tab' || event.key! === 'Shift')) {
            return;
        }
        setDrawerToggle(open);
    };

    return (
        <ElevationScroll {...others}>
            <MuiAppBar>
                <Container>
                    <Toolbar>
                        <Typography component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                            <Logo />
                        </Typography>
                        <Stack direction="row" sx={{ display: { xs: 'none', sm: 'block' } }} spacing={2}>
                            <Button color="inherit" component={MuiLink}>
                                Home
                            </Button>
                            <Button color="inherit" component={MuiLink} href="/dashboard" target="_blank">
                                Dashboard
                            </Button>
                            <Button color="inherit" component={MuiLink} href="https://codedthemes.gitbook.io/berry" target="_blank">
                                Documentation
                            </Button>
                            <Button
                                component={MuiLink}
                                href="https://mui.com/store/items/berry-react-material-admin/"
                                disableElevation
                                variant="contained"
                                color="secondary"
                                target="_blank"
                            >
                                Purchase Now
                            </Button>
                        </Stack>
                        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <IconButton color="inherit" onClick={drawerToggler(true)} size="large">
                                <MenuIcon />
                            </IconButton>
                            <Drawer anchor="top" open={drawerToggle} onClose={drawerToggler(false)}>
                                <Box
                                    sx={{
                                        width: 'auto'
                                    }}
                                    role="presentation"
                                    onClick={drawerToggler(false)}
                                    onKeyDown={drawerToggler(false)}
                                >
                                    <List>
                                        <MuiLink style={{ textDecoration: 'none' }} href="#" target="_blank">
                                            <ListItemButton component="a">
                                                <ListItemIcon>
                                                    <IconHome2 />
                                                </ListItemIcon>
                                                <ListItemText primary="Home" />
                                            </ListItemButton>
                                        </MuiLink>
                                        <MuiLink style={{ textDecoration: 'none' }} href="/login" target="_blank">
                                            <ListItemButton component="a">
                                                <ListItemIcon>
                                                    <IconDashboard />
                                                </ListItemIcon>
                                                <ListItemText primary="Dashboard" />
                                            </ListItemButton>
                                        </MuiLink>
                                        <MuiLink
                                            style={{ textDecoration: 'none' }}
                                            href="https://codedthemes.gitbook.io/berry"
                                            target="_blank"
                                        >
                                            <ListItemButton component="a">
                                                <ListItemIcon>
                                                    <IconBook />
                                                </ListItemIcon>
                                                <ListItemText primary="Documentation" />
                                            </ListItemButton>
                                        </MuiLink>
                                        <MuiLink
                                            style={{ textDecoration: 'none' }}
                                            href="https://mui.com/store/items/berry-react-material-admin/"
                                            target="_blank"
                                        >
                                            <ListItemButton component="a">
                                                <ListItemIcon>
                                                    <IconCreditCard />
                                                </ListItemIcon>
                                                <ListItemText primary="Purchase Now" />
                                            </ListItemButton>
                                        </MuiLink>
                                    </List>
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </MuiAppBar>
        </ElevationScroll>
    );
};

export default AppBar;
