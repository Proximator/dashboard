import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';

// project imports
import FriendsCard from 'ui-component/cards/FriendsCard';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'utils/axios';
import { gridSpacing } from 'store/constant';

// assets
import { IconSearch } from '@tabler/icons';

// ==============================|| SOCIAL PROFILE - FRIENDS ||============================== //

const Friends = () => {
    const theme = useTheme();
    const [friends, setFriends] = useState([]);
    const getFriends = async () => {
        const response = await axios.get('/api/friends/list');
        setFriends(response.data.friends);
    };

    useEffect(() => {
        getFriends();
    }, []);

    let friendsResult = <></>;
    if (friends) {
        friendsResult = friends.map((friend, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <FriendsCard {...friend} />
            </Grid>
        ));
    }

    const [search, setSearch] = useState('');
    const handleSearch = async (event) => {
        const newString = event?.target.value;
        setSearch(newString);

        if (newString) {
            await axios
                .post('/api/friends/filter', {
                    key: newString
                })
                .then((response) => {
                    setFriends(response.data.results);
                });
        } else {
            getFriends();
        }
    };

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">
                            Friends{' '}
                            <Typography variant="h3" component="span" sx={{ color: theme.palette.grey[300], fontWeight: 500 }}>
                                (463)
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <OutlinedInput
                            size="small"
                            id="input-search-user-profile"
                            placeholder="Search"
                            value={search}
                            onChange={handleSearch}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="1rem" />
                                </InputAdornment>
                            }
                        />
                    </Grid>
                </Grid>
            }
        >
            <Grid container direction="row" spacing={gridSpacing}>
                {friendsResult}
            </Grid>
        </MainCard>
    );
};

export default Friends;
