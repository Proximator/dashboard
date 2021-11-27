// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from '../../../config';
import Logo from '../../../ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple href={config.defaultPath}>
        <Logo />
    </ButtonBase>
);

export default LogoSection;
