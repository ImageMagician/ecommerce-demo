import { Outlet, Navigate } from 'react-router-dom';
import { useSelector }      from 'react-redux';

import type { RootState }   from "../store.ts";

const AdminRoute = () => {
    const { userInfo } = useSelector( ( state: RootState ) => state.auth ) ;

    return ( userInfo && userInfo.isAdmin ) ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AdminRoute;