import { Outlet } from 'react-router-dom';
import { GqlErr } from '../../utils/useCheckToken';

interface AuthLayoutProps {
    valid_token: {
        viewer: null;
        error: GqlErr | null;
        loading: boolean;
    }
}

export const AuthLayout = ({}:AuthLayoutProps) => {
return (
 <div className='w-full h-full flex items-center justify-center'>
    <Outlet/>
 </div>
);
}
