import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// material-ui
import { Box, Grid, Tab, Tabs } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Board from './Board';
import Backlogs from './Backlogs';
import { SET_MENU } from 'store/actions';

// tab content
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// ==============================|| APPLICATION - KANBAN ||============================== //

export default function KanbanPage() {
    const dispatch = useDispatch();

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        // hide left drawer when email app opens
        dispatch({ type: SET_MENU, opened: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <Grid container>
                <Grid item xs={12}>
                    <MainCard contentSX={{ p: 2 }}>
                        <Tabs
                            value={value}
                            variant="scrollable"
                            onChange={handleChange}
                            sx={{
                                px: 1,
                                pb: 2,
                                '& a': {
                                    minWidth: 10,
                                    px: 1,
                                    py: 1.5,
                                    mr: 2.25,
                                    color: 'grey.600',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                                '& a.Mui-selected': {
                                    color: 'primary.main'
                                },
                                '& a > svg': {
                                    marginBottom: '0px !important',
                                    mr: 1.25
                                }
                            }}
                        >
                            <Tab
                                sx={{ textTransform: 'none' }}
                                component={Link}
                                to="#"
                                label={value === 0 ? 'Board' : 'View as Board'}
                                {...a11yProps(0)}
                            />
                            <Tab
                                sx={{ textTransform: 'none' }}
                                component={Link}
                                to="#"
                                label={value === 1 ? 'Backlogs' : 'View as Backlog'}
                                {...a11yProps(1)}
                            />
                        </Tabs>

                        <TabPanel value={value} index={0}>
                            <Board />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Backlogs />
                        </TabPanel>
                    </MainCard>
                </Grid>
            </Grid>
        </Box>
    );
}
