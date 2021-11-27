import React from 'react';

// material-ui
import { makeStyles } from '@mui/styles';
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { KeyedObject, LinkTarget } from 'types';
import { Theme } from '@mui/material/styles';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    primaryBackground: {
        background: theme.palette.primary.main,
        color: theme.palette.background.paper
    },
    secondaryBackground: {
        background: theme.palette.secondary.main,
        color: theme.palette.background.paper
    },
    errorBackground: {
        background: theme.palette.error.main,
        color: theme.palette.background.paper
    },
    warningBackground: {
        background: theme.palette.warning.dark,
        color: theme.palette.background.paper
    },
    infoBackground: {
        background: theme.palette.info.main,
        color: theme.palette.background.paper
    },
    successBackground: {
        background: theme.palette.success.dark,
        color: theme.palette.background.paper
    },
    darkBackground: {
        background: theme.palette.dark.dark,
        color: theme.palette.dark.light
    },
    greyBackground: {
        background: theme.palette.grey[500],
        color: theme.palette.background.paper
    },
    primaryOutline: {
        background: theme.palette.background.paper,
        color: theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`
    },
    secondaryOutline: {
        background: theme.palette.background.paper,
        color: theme.palette.secondary.main,
        border: `2px solid ${theme.palette.secondary.main}`
    },
    errorOutline: {
        background: theme.palette.background.paper,
        color: theme.palette.error.main,
        border: `2px solid ${theme.palette.error.main}`
    },
    warningOutline: {
        background: theme.palette.background.paper,
        color: theme.palette.warning.dark,
        border: `2px solid ${theme.palette.warning.dark}`
    },
    infoOutline: {
        background: theme.palette.background.paper,
        color: theme.palette.info.main,
        border: `2px solid ${theme.palette.info.main}`
    },
    successOutline: {
        background: theme.palette.background.paper,
        color: theme.palette.success.dark,
        border: `2px solid ${theme.palette.success.dark}`
    },
    greyOutline: {
        background: theme.palette.background.paper,
        color: theme.palette.grey[500],
        border: `2px solid ${theme.palette.grey[500]}`
    },
    darkOutline: {
        background: theme.palette.background.paper,
        color: theme.palette.secondary.dark,
        border: `2px solid ${theme.palette.secondary.dark}`
    },
    badge: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5)
    },
    xs: {
        width: theme.spacing(4.25),
        height: theme.spacing(4.25)
    },
    sm: {
        width: theme.spacing(5),
        height: theme.spacing(5)
    },
    md: {
        width: theme.spacing(7.5),
        height: theme.spacing(7.5)
    },
    lg: {
        width: theme.spacing(9),
        height: theme.spacing(9)
    },
    xl: {
        width: theme.spacing(10.25),
        height: theme.spacing(10.25)
    }
}));

// ==============================|| AVATAR ||============================== //

export interface avatarProps extends AvatarProps {
    alt?: string;
    src?: string;
    className?: string;
    color?: string;
    component?: OverridableComponent<any> /** Any component can override */;
    target?: LinkTarget;
    href?: string;
    children?: React.ReactNode;
    outline?: boolean;
    size?: string;
}

const Avatar = ({ className, color, outline, size, ...others }: avatarProps) => {
    const classes = useStyles() as KeyedObject;
    let avatarClass: string[] = [];

    const outlineColor = outline ? [classes[`${color}Outline`], ...avatarClass] : [classes[`${color}Background`], ...avatarClass];
    avatarClass = color ? outlineColor : avatarClass;
    avatarClass = size ? [classes[size], ...avatarClass] : avatarClass;
    if (className) {
        avatarClass = className ? [...avatarClass, className] : avatarClass;
    }

    return <MuiAvatar className={avatarClass.join(' ')} {...others} />;
};

export default Avatar;
