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
import { useEmails } from '@/contexts/EmailingContext';

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
  const { createEmail } = useEmails();

  // handle category change dropdown
  const [file, setFile] = useState();
  const [date, setDate] = useState(new Date().toDateString());
  const [gender, setGender] = useState('ALL');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  //   const handleSelectChange = (event) => {
  //     if (event?.target.value) setCurrency(event?.target.value);
  //   };
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

  // useEffect(() => {
  //   console.log(file);
  // }, [file]);

  // handle tag select
  const [personName, setPersonName] = useState([]);

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
      <DialogTitle>Add Banner</DialogTitle>
      <DialogContent>
        <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
          <Grid item xs={12}>
            <DesktopDatePicker
              label="Launch Date"
              value={date}
              onChange={(e) => setDate(new Date(e).toDateString())}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              id="standard-select-currency"
              select
              label="Target Group"
              value={gender}
              fullWidth
              onChange={(e) => setGender(e.target.value)}
              // helperText="Please select a gender"
            >
              {['ALL', 'MALE', 'FEMALE'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic1"
              fullWidth
              label="Subject"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic1"
              fullWidth
              multiline
              rows={3}
              label="Content"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Grid>
          {file && (
            <Grid item xs={12}>
              <ImageWrapper>
                <CardMedia component="img" image={URL.createObjectURL(file)} title="Product" />
              </ImageWrapper>
            </Grid>
          )}
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
                  <TextField
                    type="file"
                    onInput={(e) => setFile(e.target.files[0])}
                    id="file-upload"
                    fullWidth
                    label="Enter SKU"
                    sx={{ display: 'none' }}
                  />
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

                <Grid container spacing={1}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <AnimateButton>
          <Button
            variant="contained"
            onClick={async () => {
              let email = {
                subject,
                content,
                targetGroup: gender,
                launchDate: date,
                createDate: new Date().toDateString(),
                imageURL: '',
                sentDateTime: null,
                status: 'PENDING',
                targetedUsers: 1
              };
              await createEmail(email);
              handleCloseDialog();
            }}
          >
            Submit campaign and send email
          </Button>
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
