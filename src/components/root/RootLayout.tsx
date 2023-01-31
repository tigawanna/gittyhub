import { GqlErr } from '../../utils/useCheckToken';
import { Toolbar } from '../Navigation/Toolbar/Toolbar';
import { Loading } from '../Shared/Loading';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { ReactProgress } from '../Shared/loaders/ReactProgress';


interface RootLayoutProps {
    valid_token: {
        viewer: null;
        error: GqlErr | null;
        loading: boolean;
    }
}

export const RootLayout = ({valid_token}:RootLayoutProps) => {
    
    const navigation = useNavigation()
    const location = useLocation()

    const navigate  = useNavigate()
    // @ts-expect-error
    console.log("viewer  ===== ", valid_token?.viewer?.viewer?.avatarUrl
)
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
    <div className="w-full h-full dark:bg-slate-900 ">

        <div
            className="h-14 w-full  bg-slate-500 dark:bg-slate-700
         bg-opacity-70 dark:bg-opacity-90 max-h-[50px] p-1 
         sticky top-0 z-40 text-white"
        >
            {/* @ts-expect-error */}
            <Toolbar avatarUrl={valid_token?.viewer?.viewer?.avatarUrl} />
            <ReactProgress isAnimating={navigation.state === "loading"} key={location.key} />
        </div>
        <main className=" w-full sticky mt-2 top-12 overflow-y-scroll ">
            <Outlet />
            {/* <button
          onClick={() => goToTop()}
          className='w-full p-6 rounded-xl bg-red-700'>go to top </button> */}
        </main>

    </div>
);
}
