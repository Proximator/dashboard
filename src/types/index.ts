import React, { FunctionComponent, ReactElement } from 'react';
import { PaletteMode, SvgIconTypeMap, SnackbarOrigin, ChipProps, TableCellProps } from '@mui/material';
import { Property } from 'csstype';

import { OverridableComponent } from '@mui/material/OverridableComponent';

// project imports
import { UserProfile } from '_mockApis/user-profile/types';
import { TablerIcon } from '@tabler/icons';
import { CartStateProps } from './cart';
import { KanbanStateProps } from './kanban';

export type ArrangementOrder = 'asc' | 'desc' | undefined;

export type DateRange = { start: number | Date; end: number | Date };

export type GetComparator = (o: ArrangementOrder, o1: string) => (a: KeyedObject, b: KeyedObject) => number;

export type Direction = 'up' | 'down' | 'right' | 'left';

export type DialogMaxWidthType = false | 'sm' | 'xs' | 'md' | 'lg' | 'xl' | undefined;

export interface TabsProps {
    children?: React.ReactElement | string;
    value: string | number;
    index: number;
}

export interface GenericCardProps {
    title?: string;
    primary?: string | number | undefined;
    secondary?: string;
    content?: string;
    image?: string;
    dateTime?: string;
    iconPrimary?: OverrideIcon;
    color?: string;
    size?: string;
}

export type OverrideIcon =
    | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
          muiName: string;
      })
    | React.ComponentClass<any>
    | FunctionComponent<any>
    | TablerIcon;

export interface EnhancedTableHeadProps extends TableCellProps {
    onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
    order: ArrangementOrder;
    orderBy?: string;
    numSelected: number;
    rowCount: number;
    onRequestSort: (e: React.SyntheticEvent, p: string) => void;
}

export interface EnhancedTableToolbarProps {
    numSelected: number;
}

export type HeadCell = {
    id: string;
    numeric: boolean;
    label: string;
    disablePadding?: string | boolean | undefined;
    align?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
};

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export type NavItemTypeObject = { children?: NavItemType[]; items?: NavItemType[]; type?: string };

export type NavItemType = {
    id?: string;
    icon?: GenericCardProps['iconPrimary'];
    target?: boolean;
    external?: string;
    url?: string | undefined;
    type?: string;
    title?: React.ReactNode | string;
    color?: 'primary' | 'secondary' | 'default' | undefined;
    caption?: React.ReactNode | string;
    breadcrumbs?: boolean;
    disabled?: boolean;
    chip?: ChipProps;
};

export type AuthSliderProps = {
    title: string;
    description: string;
};

export interface CustomizationStateProps {
    isOpen: NavItemType[];
    type?: string;
    id?: string;
    navType: PaletteMode;
    presetColor: string;
    locale: string;
    rtlLayout: boolean;
    opened: boolean;
    fontFamily: Property.FontFamily;
    borderRadius?: number;
    outlinedFilled: boolean;
}
export interface SnackbarStateProps {
    action: boolean;
    open: boolean;
    message: string;
    anchorOrigin: SnackbarOrigin;
    variant: string;
    alertSeverity: 'error' | 'warning' | 'success';
    transition: string;
    close: boolean;
    actionButton: boolean;
}

export interface ColorPaletteProps {
    color: string;
    label: string;
    value: string;
}

export interface DefaultRootStateProps {
    customization: CustomizationStateProps;
    snackbar: SnackbarStateProps;
    cart: CartStateProps;
    kanban: KanbanStateProps;
}

export interface ColorProps {
    readonly [key: string]: string;
}

export type GuardProps = {
    children: ReactElement | null;
};

export interface StringColorProps {
    id?: string;
    label?: string;
    color?: string;
    primary?: string;
    secondary?: string;
}

export interface JWTData {
    userId: string;
}

export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};

export interface initialLoginContextProps {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
}

export interface FormInputProps {
    bug: KeyedObject;
    fullWidth?: boolean;
    size?: 'small' | 'medium' | undefined;
    label: string;
    name: string;
    required?: boolean;
    InputProps?: {
        label: string;
        startAdornment?: React.ReactNode;
    };
}

export type HandleFunction = (i: string, s: string) => Promise<void>;

export type Event = {
    id: string;
    allDay: boolean;
    color: string;
    textColor?: string;
    description: string;
    start: Date;
    end: Date;
    title: string;
};

/** ---- Common Functions types ---- */

export type StringBoolFunc = (s: string) => boolean;
export type StringNumFunc = (s: string) => number;
export type NumbColorFunc = (n: number) => StringColorProps | undefined;
export type ChangeEventFunc = (e: React.ChangeEvent<HTMLInputElement>) => void;
