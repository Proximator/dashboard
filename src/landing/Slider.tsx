// material-ui
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';

// third party
import Slider from 'react-slick';

// assets
// import imgLayout1 from '/images/landing/demo-dark.png';
// import imgLayout2 from '/images/landing/demo-rtl.png';
// import imgLayout3 from '/images/landing/demo-multi.png';
// import imgLayoutGrid from '/images/landing/img-lay-grid.png';

// styles
const LayoutImage = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    animation: '5s wings ease-in-out infinite'
});

// =============================|| SLIDER ITEMS ||============================= //

const Item = ({ item }: { item: { bg: string; image: string; title: string; content: string } }) => (
    <Grid container alignItems="center" justifyContent="center" spacing={3} textAlign="center">
        <Grid item xs={11}>
            <Box sx={{ width: '100%', position: 'relative' }}>
                <img src={item.bg} alt="Berry" style={{ width: '100%' }} />
                <LayoutImage src={item.image} alt="Berry" />
            </Box>
        </Grid>
        <Grid item xs={10}>
            <Grid container direction="column" alignItems="center" spacing={3} textAlign="center">
                <Grid item sm={12}>
                    <Typography variant="h4" component="div">
                        {item.title}
                    </Typography>
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="body2">{item.content}</Typography>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
);

// ==============================|| LANDING - SLIDER PAGE ||============================== //

const SliderPage = () => {
    const settings = {
        autoplay: true,
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const items = [
        {
            bg: '/images/landing/img-lay-grid.png',
            image: '/images/landing/demo-dark.png',
            title: 'Dark Layout',
            content: 'Modern, sleek and elegant dark color scheme that looks great in a dark variant.'
        },
        {
            bg: '/images/landing/img-lay-grid.png',
            image: '/images/landing/demo-rtl.png',
            title: 'RTL',
            content: 'Fully Support Right-to-left (RTL) design variant.'
        },
        {
            bg: '/images/landing/img-lay-grid.png',
            image: '/images/landing/demo-multi.png',
            title: 'Multi-language Support',
            content: 'Support Multi-language. Added 4 pre-filled language.'
        }
    ];

    return (
        <Slider {...settings}>
            {items.map((item, index) => (
                <Item key={index} item={item} />
            ))}
        </Slider>
    );
};

export default SliderPage;
