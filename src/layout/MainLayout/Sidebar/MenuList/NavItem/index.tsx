import React, { ForwardRefExoticComponent, RefAttributes, forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
import { MENU_OPEN, SET_MENU } from '../../../../../store/actions';
import { DefaultRootStateProps, LinkTarget, NavItemType } from '../../../../../types';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import router, { useRouter } from 'next/router';

export interface NavItemProps {
    item: NavItemType;
    level: number;
}

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }: NavItemProps) => {
    const theme = useTheme();
    const dispatch = useDispatch();    
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

    const Icon = item?.icon!;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size="1.3rem" />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
                height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    let itemTarget: LinkTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps: {
        component: ForwardRefExoticComponent<RefAttributes<HTMLAnchorElement>> | string;
        href?: string;
        target?: LinkTarget;
    } = { component: forwardRef((props, ref) => <a ref={ref} {...props} href={item.url!} />) };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const itemHandler = (id: string, e) => {
        console.log({id});
        e.preventDefault();
        // router.push(`/${id}`);
        // dispatch({ type: MENU_OPEN, id })    ;
        // matchesSM && dispatch({ type: SET_MENU, opened: false });
    };

    // active menu item on page load
    useEffect(() => {
        // eslint-disable-next-line no-undef
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch({ type: MENU_OPEN, id: item.id });
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Link href={`/${item.url}`} passHref>
            <ListItemButton
                {...listItemProps}
                disabled={item.disabled}
                sx={{
                    borderRadius: `${customization.borderRadius}px`,
                    mb: 0.5,
                    alignItems: 'flex-start',
                    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                    py: level > 1 ? 1 : 1.25,
                    pl: `${level * 24}px`
                }}
                selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
                // onClick={(e) => itemHandler( item.id!, e)}
            >
                <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
                            {item.title}
                        </Typography>
                    }
                    secondary={
                        item.caption && (
                            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                {item.caption}
                            </Typography>
                        )
                    }
                />
                {item.chip && (
                    <Chip
                        color={item.chip.color}
                        variant={item.chip.variant}
                        size={item.chip.size}
                        label={item.chip.label}
                        avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                    />
                )}
            </ListItemButton>
        </Link>
    );
};

export default NavItem;
