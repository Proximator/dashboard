import { useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Checkbox, FormHelperText, Stack } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { SNACKBAR_OPEN } from 'store/actions';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    color: yup.array().min(1, 'At least one color is required')
});

// ==============================|| FORM VALIDATION - CHECKBOX FORMIK  ||============================== //

const CheckboxForms = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            color: []
        },
        validationSchema,
        onSubmit: () => {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Checkbox - Submit Success',
                variant: 'alert',
                alertSeverity: 'success'
            });
        }
    });

    return (
        <MainCard title="Checkbox">
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Checkbox value="primary" name="color" color="primary" onChange={formik.handleChange} />
                    </Grid>
                    <Grid item>
                        <Checkbox
                            value="secondary"
                            name="color"
                            color="secondary"
                            sx={{ color: theme.palette.secondary.main }}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <Checkbox
                            value="error"
                            name="color"
                            sx={{
                                color: theme.palette.error.main,
                                '&.Mui-checked': {
                                    color: theme.palette.error.main
                                }
                            }}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ pt: '0 !important' }}>
                        {formik.errors.color && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                {' '}
                                {formik.errors.color}{' '}
                            </FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" type="submit">
                                    Submit
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default CheckboxForms;
