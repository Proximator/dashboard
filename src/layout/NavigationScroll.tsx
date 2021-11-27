import React, { useEffect } from 'react';
// import { ReactElement } from 'react-markdown';
import { useRouter } from 'next/router';

// ==============================|| NAVIGATION SCROLL TO TOP ||============================== //

const NavigationScroll = ({ children }: { children: React.ReactElement | null }) => {
    const router = useRouter();
    const { pathname } = router;

    useEffect(() => {
        // eslint-disable-next-line no-undef
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [pathname]);

    return children || null;
};

export default NavigationScroll;
