import { Outlet, useNavigate } from 'react-router-dom';
import { GqlErr } from '../../utils/useCheckToken';
import { useLocalStoreValues } from './../../store';
import { useEffect } from 'react';

interface UnAuthedRootLayoutProps {
    valid_token: {
        viewer: null;
        error: GqlErr | null;
        loading: boolean;
    }
}

export const UnAuthedRootLayout = ({ }: UnAuthedRootLayoutProps) => {
const local_vals =useLocalStoreValues()
const navigate = useNavigate()

useEffect(()=>{
    if (!local_vals.localValues.ghaccess) {
        navigate('/auth')
    }
}, [local_vals.localValues?.ghaccess])

return (
 <div className='w-full h-full flex items-center justify-center'>
    <Outlet/>
 </div>
);
}
