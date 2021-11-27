// material-ui
import { useTheme } from '@mui/material/styles';
import { CardMedia, Grid, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import imageEmpty from 'assets/images/maintenance/empty.svg';
import imageDarkEmpty from 'assets/images/maintenance/empty-dark.svg';

// ==============================|| NO/EMPTY MAIL ||============================== //

const MailEmpty = () => {
    const theme = useTheme();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sx={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
                <Grid container justifyContent="center" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <CardMedia
                            component="img"
                            image={theme.palette.mode === 'dark' ? imageDarkEmpty : imageEmpty}
                            title="Slider5 image"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Typography variant="h1" color="inherit" component="div">
                                    There is No Message
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2">When You have message that will Display here</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MailEmpty;
