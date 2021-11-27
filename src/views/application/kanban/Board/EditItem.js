import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// material-ui
import {
    Autocomplete,
    Box,
    Button,
    CardMedia,
    FormControl,
    FormControlLabel,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

// third-party
import * as yup from 'yup';
import { useFormik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { EDIT_ITEM, SNACKBAR_OPEN } from 'store/actions';

// assets
import imgMain from 'assets/images/profile/profile-back-1.png';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const avatarImage = require.context('assets/images/users', true);
const validationSchema = yup.object({
    title: yup.string().required('Task title is required'),
    dueDate: yup.date()
});

// ==============================|| KANBAN BOARD - ITEM EDIT ||============================== //

const EditItem = ({ item, profiles, userStory, columns, handleDrawerOpen }) => {
    const dispatch = useDispatch();

    const itemUserStory = userStory.filter((story) => story.itemIds.filter((itemId) => itemId === item.id)[0])[0];
    const itemColumn = columns.filter((column) => column.itemIds.filter((itemId) => itemId === item.id)[0])[0];

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: item.id,
            title: item.title,
            assign: item.assign,
            priority: item.priority,
            dueDate: item.dueDate ? new Date(item.dueDate) : new Date(),
            description: item.description,
            commentIds: item.commentIds,
            image: item.image,
            storyId: itemUserStory ? itemUserStory.id : '',
            columnId: itemColumn ? itemColumn.id : ''
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch({
                type: EDIT_ITEM,
                payload: {
                    item: {
                        id: values.id,
                        title: values.title,
                        assign: values.assign,
                        priority: values.priority,
                        dueDate: values.dueDate ? new Date(values.dueDate) : new Date(),
                        description: values.description,
                        commentIds: values.commentIds,
                        image: values.image
                    },
                    storyId: values.storyId,
                    columnId: values.columnId
                }
            });
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Submit Success',
                variant: 'alert',
                alertSeverity: 'success'
            });
            handleDrawerOpen();
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="title"
                            name="title"
                            label="Title"
                            defaultValue={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle1">Assign to:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Grid container justifyContent="flex-start">
                                    <Autocomplete
                                        id="assign"
                                        value={profiles.find((profile) => profile.id === formik.values.assign)}
                                        onChange={(event, value) => {
                                            formik.setFieldValue('assign', value?.id);
                                        }}
                                        options={profiles}
                                        fullWidth
                                        autoHighlight
                                        getOptionLabel={(option) => option.name}
                                        renderOption={(props, option) => (
                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                <img loading="lazy" width="20" src={avatarImage(`./${option.avatar}`).default} alt="" />
                                                {option.name}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="assign"
                                                label="Choose a assignee"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password' // disable autocomplete and autofill
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle1">Prioritize:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-label="color"
                                        value={formik.values.priority}
                                        onChange={formik.handleChange}
                                        name="priority"
                                        id="priority"
                                    >
                                        <FormControlLabel
                                            value="low"
                                            control={<Radio color="primary" sx={{ color: 'primary.main' }} />}
                                            label="Low"
                                        />
                                        <FormControlLabel
                                            value="medium"
                                            control={<Radio color="warning" sx={{ color: 'warning.main' }} />}
                                            label="Medium"
                                        />
                                        <FormControlLabel
                                            value="high"
                                            control={<Radio color="error" sx={{ color: 'error.main' }} />}
                                            label="High"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle1">Due date:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <DesktopDatePicker
                                    label="Due Date"
                                    value={formik.values.dueDate}
                                    inputFormat="dd/MM/yyyy"
                                    onChange={(date) => {
                                        formik.setFieldValue('dueDate', date);
                                    }}
                                    renderInput={(props) => <TextField fullWidth {...props} />}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle1">Description:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    fullWidth
                                    id="description"
                                    name="description"
                                    multiline
                                    rows={3}
                                    defaultValue={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle1">User Story:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <FormControl fullWidth>
                                    <Select
                                        id="storyId"
                                        name="storyId"
                                        displayEmpty
                                        value={formik.values.storyId}
                                        onChange={formik.handleChange}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        {userStory.map((story, index) => (
                                            <MenuItem key={index} value={story.id}>
                                                {story.id} - {story.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle1">State:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <FormControl fullWidth>
                                    <Select
                                        id="columnId"
                                        name="columnId"
                                        displayEmpty
                                        value={formik.values.columnId}
                                        onChange={formik.handleChange}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        {columns.map((column, index) => (
                                            <MenuItem key={index} value={column.id}>
                                                {column.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle1">Attachments:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item>
                                        <CardMedia
                                            component="img"
                                            image={imgMain}
                                            sx={{ width: 60, height: 60, borderRadius: 1 }}
                                            title="Slider5 image"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" size="large" sx={{ p: 2 }}>
                                            <AddRoundedIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <AnimateButton>
                            <Button fullWidth variant="contained" type="submit">
                                Save
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </form>
    );
};

EditItem.propTypes = {
    item: PropTypes.object,
    profiles: PropTypes.array,
    userStory: PropTypes.array,
    columns: PropTypes.array,
    handleDrawerOpen: PropTypes.func
};

export default EditItem;
