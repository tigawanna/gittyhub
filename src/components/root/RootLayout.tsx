

import { GqlErr } from '../../utils/useCheckToken';
import { Loading } from '../Shared/Loading';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
interface RootLayoutProps {
    valid_token: {
        viewer: null;
        error: GqlErr | null;
        loading: boolean;
    }
}

export const RootLayout = ({valid_token}:RootLayoutProps) => {

const navigate  = useNavigate()
useEffect(()=>{
if(!valid_token.viewer){
    navigate('/auth')
}
}, [valid_token.viewer])

if (valid_token.loading){
    return (
        <div className='w-full h-full flex items-center justify-center'>
          <Loading size={20}/>
        </div>
    );

}


return (
 <div className='w-full h-full flex items-center justify-center'>
    <Outlet/>
 </div>
);
}
