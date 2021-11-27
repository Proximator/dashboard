import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';

// ===============================|| UI DIALOG - FORMS ||=============================== //

export default function FormDialog() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="body2" component="span">
                            Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps
                            are running.
                        </Typography>
                    </DialogContentText>
                    <TextField autoFocus size="small" id="name" label="Email Address" type="email" fullWidth />
                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    <Button sx={{ color: theme.palette.error.dark }} onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button variant="contained" size="small" onClick={handleClose}>
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
