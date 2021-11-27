import { PaletteMode } from '@mui/material';

const config: {
    basename: string;
    defaultPath: string;
    fontFamily: string;
    borderRadius: number;
    outlinedFilled: boolean;
    theme: PaletteMode;
    presetColor: string;
    i18n: string;
    rtlLayout: boolean;
    jwt: {
        secret: string;
        timeout: string;
    };
    auth0: {
        client_id: string;
        domain: string;
    };
} = {
    // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: '',
    defaultPath: '/dashboard',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    outlinedFilled: true,
    theme: 'light', // light, dark
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    i18n: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    jwt: {
        secret: 'SECRET-KEY',
        timeout: '1 days'
    },
    auth0: {
        client_id: '7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V',
        domain: 'dev-w0-vxep3.us.auth0.com'
    }
};

export default config;
