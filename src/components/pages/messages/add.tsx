import PropTypes from 'prop-types';
import { forwardRef, useState, useRef, useEffect } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Button,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    InputLabel,
    MenuItem,
    Slide,
    TextField,
    Typography
} from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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


// animation
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

// ==============================|| PRODUCT ADD DIALOG ||============================== //

const ProductAdd = ({ open, handleCloseDialog }) => {
    const theme = useTheme();

    // handle category change dropdown
    const [file, setFile] = useState();
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
            <DialogTitle>Add News</DialogTitle>
            <DialogContent>
                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                    <Grid item xs={12}>
                        <TextField 
                            id="outlined-basic1" 
                            fullWidth 
                            label="Subject*" 
                            placeholder="Name" 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id="outlined-basic1" 
                            fullWidth 
                            rows={3}
                            multiline
                            label="Campaign Text" 
                            placeholder="Name" 
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <DesktopDatePicker
                        label="Expiration Date"
                        // value={value}
                        onChange={e => console.log(e)}

                        renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            id="standard-select-currency"
                            select
                            label="Select Gender"
                            value={"active"}
                            fullWidth
                            onChange={(e) => setGender(e.target.value)}
                            // helperText="Please select a gender"
                        >
                            {['active', 'inactive'].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                    
                    </Grid>
                    {file && <Grid item xs={12}> 
                                        <ImageWrapper >
                                            <CardMedia component="img" image={URL.createObjectURL(file)} title="Product" />
                                        </ImageWrapper>
                                    </Grid> }
                    {/* <Grid item md={6} xs={12}>
                        <TextField type="number" id="outlined-basic7" fullWidth label="Extra Shipping Free" defaultValue="0" />
                    </Grid> */}
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" align="left">
                                    Product Images*
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <TextField type="file" onInput={(e) => setFile(e.target.files[0])} id="file-upload" fullWidth label="Enter SKU" sx={{ display: 'none' }} />
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
                                      {/*<Grid item>
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
                                    </Grid> */}
                                    {/* <Grid item>
                                        <ImageWrapper>
                                            <Fab color="secondary" size="small">
                                                <CloseIcon />
                                            </Fab>
                                        </ImageWrapper>
                                    </Grid> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> 
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
                    </Grid>  */}
                </Grid>
            </DialogContent>
            <DialogActions>
                <AnimateButton>
                    <Button variant="contained">Create</Button>
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
