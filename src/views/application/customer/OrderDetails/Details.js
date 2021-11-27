// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';

// assets
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhoneAndroidTwoToneIcon from '@mui/icons-material/PhoneAndroidTwoTone';

const sxDivider = {
    borderColor: 'primary.light'
};

const detailsIconSX = {
    width: 15,
    height: 15,
    verticalAlign: 'text-top',
    mr: 0.5,
    mt: 0.25
};

// table data
function createData(product, description, quantity, amount, total) {
    return { product, description, quantity, amount, total };
}

const rows = [
    createData('Logo Design', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '6', '$200.00', '$1200.00'),
    createData('Landing Page', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '7', '$100.00', '$700.00'),
    createData('Admin Template', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '5', '$150.00', '$750.00')
];

const Details = () => {
    const theme = useTheme();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard title="Customer" secondary={<Typography variant="subtitle1">Placed on 12.07.2018 10:00</Typography>}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item>
                                    <Typography variant="body2">
                                        <CalendarTodayTwoToneIcon sx={detailsIconSX} /> Sophia Hale
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">
                                        <PhoneAndroidTwoToneIcon sx={detailsIconSX} /> 070 123 4567
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">
                                        <EmailTwoToneIcon sx={detailsIconSX} /> example@mail.com
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={sxDivider} />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={4}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h4">Payment method</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h6">Credit Card</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Transaction ID : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            000001-TXT
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Amount : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            $2500
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h4">Shipping method</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h6">Carrier</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Tracking Code : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            FX-012345-6
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Date : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            12.15.2018
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h4" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Fulfillment status : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            Delivered
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Payment status : &nbsp;
                                                        <Chip label="Paid" variant="outlined" size="small" chipcolor="success" />
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={sxDivider} />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={4}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h4">Billing address</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        First name : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            Joseph
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Last name : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            William
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Address : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            4898 Joanne Lane street
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        City : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            Boston
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Country : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            United States
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        State : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            Massachusetts
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Zip code : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            02110
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Phone : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            +1 (070) 123-4567
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sm={4}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h4">Shipping address</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        First name : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            Sara
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Last name : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            Soudan
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Address : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            4898 Joanne Lane street
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        City : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            Boston
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Country : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            United States
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        State : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            Massachusetts
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Zip code : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            02110
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Phone : &nbsp;
                                                        <Typography component="span" variant="body2">
                                                            +1 (070) 123-4567
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12}>
                <SubCard title="Products" content={false}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ pl: 3 }}>Description</TableCell>
                                            <TableCell align="right">Quantity</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                            <TableCell align="right">Total</TableCell>
                                            <TableCell align="right" sx={{ pr: 3 }} />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ pl: 3 }}>
                                                    <Typography align="left" variant="subtitle1">
                                                        {row.product}
                                                    </Typography>
                                                    <Typography align="left" variant="body2">
                                                        {row.description}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">{row.quantity}</TableCell>
                                                <TableCell align="right">{row.amount}</TableCell>
                                                <TableCell align="right">{row.total}</TableCell>
                                                <TableCell sx={{ pr: 3 }} align="right">
                                                    <IconButton color="primary" size="large">
                                                        <DeleteTwoToneIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12}>
                            <SubCard
                                sx={{
                                    mx: 3,
                                    mb: 3,
                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light
                                }}
                            >
                                <Grid container justifyContent="flex-end" spacing={gridSpacing}>
                                    <Grid item sm={6} md={4}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="subtitle1">
                                                            Sub Total :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="body2">
                                                            $4725.00
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="subtitle1">
                                                            Taxes (10%) :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="body2">
                                                            $57.00
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="subtitle1">
                                                            Discount (5%) :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="body2">
                                                            $45.00
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider sx={{ bgcolor: 'dark.main' }} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" color="primary" variant="subtitle1">
                                                            Total :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" color="primary" variant="subtitle1">
                                                            $4827.00
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default Details;
