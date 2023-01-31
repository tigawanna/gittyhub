import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { GqlErr, useCheckToken } from '../../utils/useCheckToken';

interface AuthLayoutProps {
    valid_token: {
        viewer: null;
        error: GqlErr | null;
        loading: boolean;
    }
}

export const AuthLayout = ({valid_token}:AuthLayoutProps) => {
    const { error, viewer, loading } = useCheckToken()

    const navigate = useNavigate()
    useEffect(() => {
        if (valid_token?.viewer) {
            navigate('/')
        }
    }, [valid_token?.viewer])

return (
 <div className='w-full h-full flex items-center justify-center'>
    <Outlet/>
 </div>
);
}
