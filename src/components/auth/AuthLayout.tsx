import { Outlet, useNavigate } from 'react-router-dom';
import { GqlErr } from '../../utils/useCheckToken';
import { useLocalStoreValues } from '../../store';
import { useEffect } from 'react';

interface AuthLayoutProps {
    valid_token: {
        viewer: null;
        error: GqlErr | null;
        loading: boolean;
    }
}

export const AuthLayout = ({}:AuthLayoutProps) => {
    const local_vals = useLocalStoreValues()
    const navigate = useNavigate()

    useEffect(() => {
        if ((local_vals.localValues.ghaccess || local_vals.localValues.token) && !local_vals.localValues.isoauthing) {
            navigate('/')
        }
    }, [local_vals.localValues?.ghaccess, local_vals.localValues.token])

return (
 <div className='w-full h-full flex items-center justify-center'>
    <Outlet/>
 </div>
);
}
