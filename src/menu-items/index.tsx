import Marketing from './marketing';
import Dashboard from './dashboard';
import { NavItemType } from '../types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [Dashboard, Marketing]
};

export default menuItems;
