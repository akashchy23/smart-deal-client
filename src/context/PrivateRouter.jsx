import React, { use } from 'react';
import { Navigate } from 'react-router';
import { Authcontext } from './AuthContext';

const PrivateRouter = ({children}) => {
    const {user}=use(Authcontext)
    if(user){
        return children
    }
    return <Navigate to='/login'></Navigate>
};

export default PrivateRouter;