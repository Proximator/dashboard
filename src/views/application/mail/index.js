import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Grid, useMediaQuery } from '@mui/material';

// project imports
import MailDrawer from './MailDrawer';
import MailDetails from './MailDetails';
import MailList from './MailList';
import axios from 'utils/axios';
import { SET_MENU } from 'store/actions';
import { appDrawerWidth as drawerWidth, gridSpacing } from 'store/constant';

// drawer content element
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: 'calc(100% - 320px)',
    flexGrow: 1,
    paddingLeft: open ? theme.spacing(3) : 0,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.down('xl')]: {
        paddingLeft: 0,
        marginLeft: 0
    },
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    })
}));

// ==============================|| MAIL MAIN PAGE ||============================== //

const MailPage = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('xl'));

    const [emailDetails, setEmailDetailsValue] = useState(false);
    const [selectedMail, setSelectedMail] = useState(null);

    const [data, setData] = useState([]);
    const [unreadCounts, setUnreadCounts] = useState();

    const getData = async () => {
        const response = await axios.get('/api/mails/list');
        setData(response.data.mails);
        setUnreadCounts(response.data.unreadCount);
    };

    const handleUserChange = async (data) => {
        if (data) {
            await axios.post('/api/mails/setRead', { id: data.id });
            await getData();
        }
        setSelectedMail(data);
        setEmailDetailsValue((prev) => !prev);
    };

    const [openMailSidebar, setOpenMailSidebar] = useState(true);
    const handleDrawerOpen = () => {
        setOpenMailSidebar((prevState) => !prevState);
    };

    useEffect(() => {
        if (matchDownSM) {
            setOpenMailSidebar(false);
        } else {
            setOpenMailSidebar(true);
        }
    }, [matchDownSM]);

    useEffect(() => {
        // hide left drawer when email app opens
        dispatch({ type: SET_MENU, opened: false });
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [filter, setFilter] = useState('all');
    const handleFilter = async (string) => {
        setEmailDetailsValue(false);
        setFilter(string);
        const response = await axios.post('/api/mails/filter', {
            filter: string
        });
        setData(response.data);
    };

    const handleImportantChange = async (event, dataImportant) => {
        if (dataImportant) {
            await axios.post('/api/mails/setImportant', { id: dataImportant.id });
            handleFilter(filter);
        }
    };

    const handleStarredChange = async (event, dataStarred) => {
        if (dataStarred) {
            await axios.post('/api/mails/setStarred', { id: dataStarred.id });
            handleFilter(filter);
        }
    };

    // search email using name
    const [search, setSearch] = useState('');
    const handleSearch = (event) => {
        const newString = event.target.value;
        setSearch(newString);

        if (newString) {
            const newRows = data.filter((row) => {
                let matches = true;

                const properties = ['name'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (row.profile[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setData(newRows);
        } else {
            handleFilter(filter);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <MailDrawer
                openMailSidebar={openMailSidebar}
                handleDrawerOpen={handleDrawerOpen}
                filter={filter}
                handleFilter={handleFilter}
                unreadCounts={unreadCounts}
            />
            <Main theme={theme} open={openMailSidebar}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        {/* mail details & list */}
                        {emailDetails ? (
                            <MailDetails
                                data={selectedMail}
                                handleUserDetails={(e, d) => handleUserChange(d)}
                                handleImportantChange={handleImportantChange}
                                handleStarredChange={handleStarredChange}
                            />
                        ) : (
                            <MailList
                                handleUserDetails={(e, d) => handleUserChange(d)}
                                handleDrawerOpen={handleDrawerOpen}
                                handleImportantChange={handleImportantChange}
                                handleStarredChange={handleStarredChange}
                                data={data}
                                search={search}
                                handleSearch={handleSearch}
                            />
                        )}
                    </Grid>
                </Grid>
            </Main>
        </Box>
    );
};

export default MailPage;
