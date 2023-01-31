
import { Outlet } from '@tanstack/react-location';
import { useCheckToken } from '../../utils/useCheckToken';
import { Loading } from '../Shared/Loading';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
interface RootLayoutProps {

}

export const RootLayout = ({}:RootLayoutProps) => {
const { error, viewer, loading } = useCheckToken()
const navigate  = useNavigate()
useEffect(()=>{
if(error?.message!==""){
navigate('/auth')
}
},[error])

if(loading){
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
