import { useState, useEffect } from 'react';

// material-ui
import { Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';

// project imports
import FriendRequestCard from 'ui-component/cards/FriendRequestCard';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'utils/axios';
import { gridSpacing } from 'store/constant';

// assets
import { IconSearch } from '@tabler/icons';

// ==============================|| SOCIAL PROFILE - FRIEND REQUEST ||============================== //

const FriendRequest = () => {
    const [friendRequest, setFriendRequest] = useState([]);

    const [search, setSearch] = useState('');

    const getFriendRequest = async () => {
        const response = await axios.get('/api/friend-request/list');
        setFriendRequest(response.data.friends);
    };

    const handleSearch = async (event) => {
        const newString = event?.target.value;
        setSearch(newString);

        if (newString) {
            await axios
                .post('/api/friend-request/filter', {
                    key: newString
                })
                .then((response) => {
                    setFriendRequest(response.data.results);
                });
        } else {
            getFriendRequest();
        }
    };

    useEffect(() => {
        getFriendRequest();
    }, []);

    let friendRequestResult = <></>;
    if (friendRequest) {
        friendRequestResult = friendRequest.map((friend, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <FriendRequestCard {...friend} />
            </Grid>
        ));
    }

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">Friend Request</Typography>
                    </Grid>
                    <Grid item>
                        <OutlinedInput
                            size="small"
                            id="input-search-user-profile"
                            placeholder="Search Friends"
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
                {friendRequestResult}
            </Grid>
        </MainCard>
    );
};

export default FriendRequest;
