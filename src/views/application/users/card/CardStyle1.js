import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, InputAdornment, Menu, MenuItem, OutlinedInput, Pagination, Typography } from '@mui/material';

// project imports
import UserDetailsCard from 'ui-component/cards/UserDetailsCard';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'utils/axios';
import { gridSpacing } from 'store/constant';

// assets
import { IconSearch } from '@tabler/icons';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

// ==============================|| USER CARD STYLE 1 ||============================== //

const CardStyle1 = () => {
    const theme = useTheme();
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        const response = await axios.get('/api/details-card/list');
        setUsers(response.data.users);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [search, setSearch] = useState('');
    const handleSearch = async (event) => {
        const newString = event?.target.value;
        setSearch(newString);

        if (newString) {
            await axios
                .post('/api/details-card/filter', {
                    key: newString
                })
                .then((response) => {
                    setUsers(response.data.results);
                });
        } else {
            getUsers();
        }
    };

    let usersResult = <></>;
    if (users) {
        usersResult = users.map((user, index) => (
            <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                <UserDetailsCard {...user} />
            </Grid>
        ));
    }

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">Cards</Typography>
                    </Grid>
                    <Grid item>
                        <OutlinedInput
                            id="input-search-card-style1"
                            placeholder="Search"
                            value={search}
                            onChange={handleSearch}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="1rem" />
                                </InputAdornment>
                            }
                            size="small"
                        />
                    </Grid>
                </Grid>
            }
        >
            <Grid container direction="row" spacing={gridSpacing}>
                {usersResult}
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between" spacing={gridSpacing}>
                        <Grid item>
                            <Pagination count={10} color="primary" />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="text"
                                size="large"
                                sx={{ color: theme.palette.grey[900] }}
                                color="inherit"
                                endIcon={<ExpandMoreRoundedIcon />}
                                onClick={handleClick}
                            >
                                10 Rows
                            </Button>
                            <Menu
                                id="menu-user-card-style1"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                variant="selectedMenu"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                            >
                                <MenuItem onClick={handleClose}> 10 Rows</MenuItem>
                                <MenuItem onClick={handleClose}> 20 Rows</MenuItem>
                                <MenuItem onClick={handleClose}> 30 Rows </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default CardStyle1;
