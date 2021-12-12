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

// assets
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

import Product1 from 'assets/images/widget/prod1.jpg';
import Product2 from 'assets/images/widget/prod2.jpg';
import Product3 from 'assets/images/widget/prod3.jpg';
import Product4 from 'assets/images/widget/prod4.jpg';
import { useRewards } from '@/contexts/RewardsContext';

const createData = (date, id, points, description, expirationDate, discount, gender, status) => {
    return { date, id, points, description, expirationDate, discount, gender, status };
}



// styles
const ImageWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '4px',
    cursor: 'pointer',
    width: 55,
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    '& > svg': {
        verticalAlign: 'sub',
        marginRight: 6
    }
}));

// product category options
const categories = [
    {
        value: '1',
        label: 'Iphone 12 Pro Max'
    },
    {
        value: '2',
        label: 'Iphone 11 Pro Max'
    },
    {
        value: '3',
        label: 'Nokia'
    },
    {
        value: '4',
        label: 'Samsung'
    }
];

// animation
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    },
    chip: {
        margin: 2
    }
};

// tags list & style
const tagNames = ['Html', 'Scss', 'Js', 'React', 'Ionic', 'Angular', 'css', 'Php', 'View'];

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}

// ==============================|| PRODUCT ADD DIALOG ||============================== //

const ProductAdd = ({ open, handleCloseDialog }) => {
    const theme = useTheme();
    const { createReward } = useRewards(); 

    // handle category change dropdown
    const [gender, setGender] = useState('All'); 
    const [currency, setCurrency] = useState('2');
    const handleSelectChange = (event) => {
        if (event?.target.value) setCurrency(event?.target.value);
    };
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

    // handle tag select
    const [personName, setPersonName] = useState([]);
    const handleTagSelectChange = (event) => {
        setPersonName(event?.target.value);
    };

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
                        margin="normal"
                        fullWidth
                        renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <DesktopDatePicker
                        label="Expiration Date&Time"
                        // value={value}
                        onChange={e => console.log(e.target.value)}
                        margin="normal"
                        fullWidth
                        renderInput={(params) => <TextField {...params} fullWidth/>}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic2"
                            fullWidth
                            multiline
                            rows={3}
                            label="Description"
                            placeholder="Write your description here"
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField
                            id="standard-select-currency"
                            // select
                            label="Enter Date*"
                            value=""
                            fullWidth
                            onChange={handleSelectChange}
                            helperText="Please select Category"
                        />
                        
                    </Grid> */}
                    
                    {/* <Grid item xs={12}>
                        <TextField id="outlined-basic4" fullWidth label="SKU*" defaultValue="H8J702729P" />
                    </Grid> */}
                    <Grid item md={6} xs={12}>
                        <TextField
                            label="Points"
                            id="filled-start-adornment1"
                            value={0}
                            InputProps={{ startAdornment: <InputAdornment position="start">#</InputAdornment> }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            label="Discount"
                            id="filled-start-adornment2"
                            value="10"
                            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            id="standard-select-currency"
                            select
                            label="Select Gender"
                            value={"All"}
                            fullWidth
                            onChange={(e) => setGender(e.target.value)}
                            // helperText="Please select a gender"
                        >
                            {['All', 'Male', 'Female'].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                            <FormControlLabel control={<Switch defaultChecked />} label="Active" />
                    </Grid>

                    {/* <Grid item md={6} xs={12}>
                        <TextField type="number" id="outlined-basic7" fullWidth label="Extra Shipping Free" defaultValue="0" />
                    </Grid> */}
                    {/* <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" align="left">
                                    Product Images*
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <TextField type="file" id="file-upload" fullWidth label="Enter SKU" sx={{ display: 'none' }} />
                                    <InputLabel
                                        htmlFor="file-upload"
                                        sx={{
                                            background: theme.palette.background.default,
                                            py: 3.75,
                                            px: 0,
                                            textAlign: 'center',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            mb: 3,
                                            '& > svg': {
                                                verticalAlign: 'sub',
                                                mr: 0.5
                                            }
                                        }}
                                    >
                                        <CloudUploadIcon /> Drop file here to upload
                                    </InputLabel>
                                </div>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <ImageWrapper>
                                            <CardMedia component="img" image={Product1} title="Product" />
                                        </ImageWrapper>
                                    </Grid>
                                    <Grid item>
                                        <ImageWrapper>
                                            <CardMedia component="img" image={Product2} title="Product" />
                                        </ImageWrapper>
                                    </Grid>
                                    <Grid item>
                                        <ImageWrapper>
                                            <CardMedia component="img" image={Product3} title="Product" />
                                        </ImageWrapper>
                                    </Grid>
                                    <Grid item>
                                        <ImageWrapper>
                                            <CardMedia component="img" image={Product4} title="Product" />
                                            <CircularProgress
                                                variant="determinate"
                                                value={progress}
                                                color="secondary"
                                                sx={{
                                                    position: 'absolute',
                                                    left: '0',
                                                    top: '0',
                                                    background: 'rgba(255, 255, 255, .8)',
                                                    width: '100% !important',
                                                    height: '100% !important',
                                                    p: 1.5
                                                }}
                                            />
                                        </ImageWrapper>
                                    </Grid>
                                    <Grid item>
                                        <ImageWrapper>
                                            <Fab color="secondary" size="small">
                                                <CloseIcon />
                                            </Fab>
                                        </ImageWrapper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> */}
                    {/* <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" align="left">
                                    Tags
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <Select
                                        id="demo-multiple-chip"
                                        multiple
                                        fullWidth
                                        value={personName}
                                        onChange={handleTagSelectChange}
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={(selected) => (
                                            <div>
                                                {typeof selected !== 'string' &&
                                                    selected.map((value) => <Chip key={value} label={value} />)}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {tagNames.map((name) => (
                                            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid> */}
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
