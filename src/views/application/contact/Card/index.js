import { useState, useEffect, Fragment } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Divider, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';

// project imports
import UserDetails from '../UserDetails';
import UserEdit from '../UserEdit';
import ContactCard from 'ui-component/cards/ContactCard';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'utils/axios';
import { gridSpacing } from 'store/constant';
import User1 from 'assets/images/users/avatar-1.png';

// assets
import { IconSearch } from '@tabler/icons';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

// ==============================|| CONTACT CARD ||============================== //

const ContactCardPage = () => {
    const theme = useTheme();

    // get all users details
    const [data, setData] = useState({});
    const convertData = (userData) =>
        userData.reduce((a, curr) => {
            const firstLatter = curr.name[0].toUpperCase();
            if (Object.prototype.hasOwnProperty.call(a, firstLatter)) {
                a[firstLatter].push(curr);
            } else {
                a[firstLatter] = [curr];
            }
            return a;
        }, {});

    const getData = async () => {
        const response = await axios.get('/api/chat/users');
        setData(convertData(response.data.users));
        return response.data.users;
    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // edit selected user and modify users data
    const [user, setUser] = useState({});
    const modifyUser = async (u) => {
        await axios.post('/api/chat/users/modify', u);
        getData().then((d) => {
            if (user) {
                const idx = d.findIndex((item) => item.id === user.id);
                if (idx > -1) setUser(d[idx]);
            }
        });
    };

    // handle new user insert action
    const [userDetails, setUserDetails] = useState(false);
    const [userEdit, setUserEdit] = useState(false);
    const handleOnAdd = () => {
        setUser({
            name: '',
            company: '',
            role: '',
            work_email: '',
            personal_email: '',
            work_phone: '',
            personal_phone: '',
            location: 'USA',
            image: User1,
            status: 'I am online',
            lastMessage: '2h ago',
            birthdayText: ''
        });
        setUserDetails(false);
        setUserEdit(true);
    };

    return (
        <MainCard title="Contact Cards">
            <Grid container spacing={gridSpacing}>
                <Grid
                    className="block"
                    item
                    xs
                    zeroMinWidth
                    sx={{ display: userDetails || userEdit ? { xs: 'none', md: 'flex' } : 'flex' }}
                >
                    <Grid container alignItems="center" spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <OutlinedInput
                                id="input-search-card-style1"
                                placeholder="Search Contact"
                                fullWidth
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconSearch stroke={1.5} size="1rem" />
                                    </InputAdornment>
                                }
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" size="large" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={handleOnAdd}>
                                Add
                            </Button>
                        </Grid>

                        {Object.keys(data).map((key, index) => (
                            <Fragment key={index}>
                                <Grid item xs={12}>
                                    <Divider sx={{ borderColor: theme.palette.primary.light, mt: 0.625, mb: 1.875 }} />
                                    <Typography variant="h4" color="primary" sx={{ fontSize: '1rem' }}>
                                        {key.toUpperCase()}
                                    </Typography>
                                    <Divider sx={{ borderColor: theme.palette.primary.light, mt: 1.875, mb: 0.625 }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container direction="row" spacing={gridSpacing}>
                                        {data[key].map((userRow, i) => (
                                            <Grid item xs={12} md={6} lg={4} xl={3} key={i}>
                                                <ContactCard
                                                    avatar={userRow.avatar}
                                                    name={userRow.name}
                                                    role={userRow.role}
                                                    email={userRow.work_email}
                                                    contact={userRow.phone}
                                                    location={userRow.location}
                                                    onActive={() => {
                                                        setUser(userRow);
                                                        setUserDetails(true);
                                                        setUserEdit(false);
                                                    }}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Fragment>
                        ))}
                    </Grid>
                </Grid>

                {userDetails && (
                    <Grid item sx={{ width: 342, margin: { xs: '0 auto', md: 'initial' } }}>
                        <UserDetails
                            user={user}
                            onEditClick={() => {
                                setUserDetails(false);
                                setUserEdit(true);
                            }}
                            onClose={() => {
                                setUserDetails(false);
                                setUserEdit(false);
                            }}
                        />
                    </Grid>
                )}

                {userEdit && (
                    <Grid item sx={{ width: 342, margin: { xs: '0 auto', md: 'initial' } }}>
                        <UserEdit
                            user={user}
                            onSave={(u) => {
                                if (u.id) setUserDetails(true);
                                setUserEdit(false);
                                modifyUser(u);
                            }}
                            onCancel={(u) => {
                                if (u.id) setUserDetails(true);
                                setUserEdit(false);
                            }}
                        />
                    </Grid>
                )}
            </Grid>
        </MainCard>
    );
};

export default ContactCardPage;
