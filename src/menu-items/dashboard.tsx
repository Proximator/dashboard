// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome, IconBrowser, IconHelp, IconHome2, IconGift } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome,
    IconBrowser,
    IconHelp,
    IconGift,
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'marketing',
    title: <FormattedMessage id="Dashboard" />,
    type: 'group',
    children: [
        {
            id: 'default',
            title: <FormattedMessage id="default" />,
            type: 'item',
            icon: IconHome2,
            url: '/dashboard/default'
        },
        // {
        //     id: 'sample-page',
        //     title: <FormattedMessage id="sample-page" />,
        //     type: 'item',
        //     url: '/sample-page',
        //     icon: icons.IconBrowser,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'documentation',
        //     title: <FormattedMessage id="documentation" />,
        //     type: 'item',
        //     url: 'https://codedthemes.gitbook.io/berry/',
        //     icon: icons.IconHelp,
        //     external: true,
        //     target: true
        // },
        // {
        //     id: 'roadmap',
        //     title: <FormattedMessage id="roadmap" />,
        //     type: 'item',
        //     url: 'https://codedthemes.gitbook.io/berry/roadmap',
        //     icon: icons.IconSitemap,
        //     external: true,
        //     target: true
        // }
    ]
};

export default other;
