import PropTypes from 'prop-types';
import { forwardRef, useState, useRef, useEffect } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Button,
    CardMedia,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    FormControlLabel,
    FormGroup,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Slide,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';




// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useRewards } from '@/contexts/RewardsContext';
import { Reward } from '@/types';
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);


// ==============================|| PRODUCT ADD DIALOG ||============================== //

const ProductAdd = ({ open, handleCloseDialog, reward }: {open: boolean, handleCloseDialog: () => void, reward: Reward}) => {

    const { createReward } = useRewards(); 

    // handle category change dropdown
    const [values, setValues] = useState<Reward>(reward || {
        description: '',
        points: 0,
        discount: 0,
        expirationDate: new Date().toDateString(),
        gender: 'all',
        status: true,
    });
    console.log({values});
    // set image upload progress
    const [progress, setProgress] = useState(0);
    const progressRef = useRef(() => {});
    useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
            } else {
                const diff = Math.random() * 10;
                setProgress(progress + diff);
            }
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
            sx={{
                '&>div:nth-child(3)': {
                    justifyContent: 'flex-end',
                    '&>div': {
                        m: 0,
                        borderRadius: '0px',
                        maxWidth: 450,
                        maxHeight: '100%'
                    }
                }
            }}
        >
            <DialogTitle>Add Rewards</DialogTitle>
            <DialogContent>
                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                    {/* <Grid item xs={12}>
                        <TextField id="outlined-basic1" fullWidth label="Enter Product Name*" defaultValue="Iphone 11 Pro Max" />
                    </Grid> */}
                    <Grid item lg={12} xs={12}>
                        <DesktopDatePicker
                        label="Start Date"
                        // value={value}
                        onChange={time => console.log(time)}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <DesktopDatePicker
                        label="Expiration Date"
                        value={values.expirationDate}
                        onChange={e => console.log(e)}
                        renderInput={(params) => <TextField {...params} fullWidth/>}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic2"
                            fullWidth
                            multiline
                            value={values.description}
                            onChange={e => setValues({...values, description: e.target.value})}
                            rows={3}
                            label="Description"
                            placeholder="Write your description here"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            label="Points"
                            id="filled-start-adornment1"
                            value={values.points}
                            type="number"
                            onChange={e => setValues({...values, points: Number(e.target.value)})}
                            InputProps={{ startAdornment: <InputAdornment position="start">#</InputAdornment> }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            label="Discount"
                            id="filled-start-adornment2"
                            type="number"
                            value={values.discount}
                            onChange={e => setValues({...values, discount: Number(e.target.value)})}
                            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            id="standard-select-currency"
                            select
                            label="Select Gender"
                            value={values.gender}
                            fullWidth
                            onChange={(e) => setValues({...values, gender: e.target.value})}
                        >
                            {['All', 'Male', 'Female'].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                            <FormControlLabel control={<Switch checked={values.status} onChange={() => setValues({...values, status: !values.status})}/>} label="Active" />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <AnimateButton >
                    <Button variant="contained" onClick={async () => {
                    console.log('here');
                    await createReward(createData('07.10.2020', 1, 23, 'reward 1', '07/12/2021', 20, 'all', true));
                    console.log('dome');
                }}>Create</Button>
                </AnimateButton>
                <Button variant="text" color="error" onClick={handleCloseDialog}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ProductAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default ProductAdd;