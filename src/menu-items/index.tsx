import Marketing from './marketing';
import Dashboard from './dashboard';
import Loyality from './loyality';
import { NavItemType } from '../types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [Dashboard, Loyality, Marketing]
};

export default menuItems;
