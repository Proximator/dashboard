import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Grid, TextField } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// =======================|| FIREBASE - CODE VERIFICATION ||======================= //

const AuthCodeVerification = () => {
    const theme = useTheme();

    const [code, setCode] = useState({
        code1: '',
        code2: '',
        code3: '',
        code4: ''
    });

    const handleChange = (event, name) => {
        const re = /^[0-9\b]+$/;
        if (event.target?.value.length < 2 && (event.target?.value === '' || re.test(event.target?.value))) {
            setCode({ ...code, [name]: event.target?.value });
        }
    };

    const inputSX = {
        ...theme.typography.customInput,
        '& > div > input': {
            p: { xs: 1.5, md: 2 },
            textAlign: 'center'
        }
    };

    return (
        <>
            <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        margin="normal"
                        name="fname1"
                        type="text"
                        value={code.code1}
                        sx={inputSX}
                        placeholder="9"
                        onChange={(e) => handleChange(e, 'code1')}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        margin="normal"
                        name="fname2"
                        type="text"
                        value={code.code2}
                        sx={inputSX}
                        placeholder="9"
                        onChange={(e) => handleChange(e, 'code2')}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        margin="normal"
                        name="fname3"
                        type="text"
                        value={code.code3}
                        sx={inputSX}
                        placeholder="9"
                        onChange={(e) => handleChange(e, 'code3')}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        margin="normal"
                        name="fname4"
                        type="text"
                        value={code.code4}
                        sx={inputSX}
                        placeholder="9"
                        onChange={(e) => handleChange(e, 'code4')}
                    />
                </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
                <AnimateButton>
                    <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
                        Continue
                    </Button>
                </AnimateButton>
            </Box>
        </>
    );
};

export default AuthCodeVerification;
