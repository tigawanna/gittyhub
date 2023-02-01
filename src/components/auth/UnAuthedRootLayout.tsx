import { Outlet } from 'react-router-dom';
import { GqlErr } from '../../utils/useCheckToken';

interface UnAuthedRootLayoutProps {
    valid_token: {
        viewer: null;
        error: GqlErr | null;
        loading: boolean;
    }
}

export const UnAuthedRootLayout = ({ }: UnAuthedRootLayoutProps) => {
return (
 <div className='w-full h-full flex items-center justify-center'>
    <Outlet/>
 </div>
);
}
