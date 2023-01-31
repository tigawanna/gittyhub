import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useCheckToken } from '../../utils/useCheckToken';

interface AuthLayoutProps {

}

export const AuthLayout = ({}:AuthLayoutProps) => {
    const { error, viewer, loading } = useCheckToken()
    
    const navigate = useNavigate()
    useEffect(() => {
        if (viewer) {
            navigate('/')
        }
    }, [viewer])

return (
 <div className='w-full h-full flex items-center justify-center'>
    <Outlet/>
 </div>
);
}
