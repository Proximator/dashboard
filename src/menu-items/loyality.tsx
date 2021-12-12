// third-party
import { IconGift } from '@tabler/icons';
import { FormattedMessage } from 'react-intl';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'loyality',
    title: <FormattedMessage id="loyality" />,
    type: 'group',
    children: [
        {
            id: 'rewards',
            title: <FormattedMessage id="rewards" />,
            type: 'item',
            icon: IconGift,
            url: '/rewards'
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
