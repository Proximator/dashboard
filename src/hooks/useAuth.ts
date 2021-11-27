import { useContext } from 'react';

// auth provider
// import FirebaseContext from 'contexts/FirebaseContext';
// import Auth0Context from 'contexts/Auth0Context';
import JWTContext from 'contexts/JWTContext';

// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
    const context = useContext(JWTContext);

    if (!context) throw new Error('context must be use inside provider');

    return context;
};

export default useAuth;
