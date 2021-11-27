import React from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { Button, CardContent, CardMedia, Grid, Rating, Stack, Typography } from '@mui/material';

// project import
import MainCard from './MainCard';
import SkeletonProductPlaceholder from '../../ui-component/cards/Skeleton/ProductPlaceholder';
import { KeyedObject } from '../../types';
import { ADD_PRODUCTS, SNACKBAR_OPEN } from '../../store/actions';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

// eslint-disable-next-line no-undef
const prodImage = require.context('/images/e-commerce', true);

// ==============================|| PRODUCT CARD ||============================== //

export interface ProductCardProps extends KeyedObject {
    id?: string | number;
    color?: string;
    name: string;
    image: string;
    description?: string;
    offerPrice?: number;
    salePrice?: number;
    rating?: number;
}

const ProductCard = ({ id, color, name, image, description, offerPrice, salePrice, rating }: ProductCardProps) => {
    const dispatch = useDispatch();

    const prodProfile = image && prodImage(`./${image}`).default;
    const [productRating] = React.useState<number | undefined>(rating);

    const addCart = () => {
        dispatch({
            type: ADD_PRODUCTS,
            product: { id, name, image, salePrice, offerPrice, color, size: 8, quantity: 1 }
        });
        dispatch({
            type: SNACKBAR_OPEN,
            open: true,
            message: 'Add To Cart Success',
            variant: 'alert',
            alertSeverity: 'success'
        });
    };

    const [isLoading, setLoading] = React.useState(true);
    React.useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            {isLoading ? (
                <SkeletonProductPlaceholder />
            ) : (
                <MainCard
                    content={false}
                    boxShadow
                    sx={{
                        '&:hover': {
                            transform: 'scale3d(1.02, 1.02, 1)',
                            transition: 'all .4s ease-in-out'
                        }
                    }}
                >
                    <CardMedia
                        sx={{ height: 220 }}
                        image={prodProfile}
                        title="Contemplative Reptile"
                        // component={Link}
                        to={`/e-commerce/product-details/${id}`}
                    />
                    <CardContent sx={{ p: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    // component={Link}
                                    to={`/e-commerce/product-details/${id}`}
                                    variant="subtitle1"
                                    sx={{ textDecoration: 'none' }}
                                >
                                    {name}
                                </Typography>
                            </Grid>
                            {description && (
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            overflow: 'hidden',
                                            height: 45
                                        }}
                                    >
                                        {description}
                                    </Typography>
                                </Grid>
                            )}
                            <Grid item xs={12} sx={{ pt: '8px !important' }}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Rating precision={0.5} name="size-small" value={productRating} size="small" readOnly />
                                    <Typography variant="caption">({offerPrice}+)</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <Typography variant="h4">${offerPrice}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" sx={{ color: 'grey.500', textDecoration: 'line-through' }}>
                                                ${salePrice}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Button variant="contained" sx={{ minWidth: 0 }} onClick={addCart}>
                                        <ShoppingCartTwoToneIcon fontSize="small" />
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

export default ProductCard;
