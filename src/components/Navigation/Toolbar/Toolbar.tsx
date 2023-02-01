import React from 'react'


import { Consent } from './../../modal/Consent';
import { useLocalStoreValues } from './../../../store';
import { BsSunFill, BsFillMoonFill,BsMenuDown } from "react-icons/bs";
import { GrHome } from "react-icons/gr";
import { RiHome2Line } from "react-icons/ri";

import { useTheme } from './../../../utils/useTheme';
import { Search } from '../../search/Search';
import { Link } from 'react-router-dom';
import { TheIcon } from './../../Shared/wrappers/TheIcon';

interface ToolbarProps {
avatarUrl:string
}

export const Toolbar: React.FC<ToolbarProps> = ({avatarUrl}) => {
const [open, setOpen] = React.useState(false)
const localdata = useLocalStoreValues(); 
const logout = () => { localdata.updateToken(null)}
const theme = useTheme()
  const nextTheme = theme.theme=== 'dark' ? 'light' : 'dark'
  const mode = theme.theme === "dark" ? BsSunFill : BsFillMoonFill;
  const toggle = () => { theme.setTheme(nextTheme) }

return (
  <div className="w-[100%] bg-slate-300 border-b dark:text-white  dark:bg-black h-[60px] max-h-[50px] 
  flex-center transition ease-linear delay-100">
    {open ? (
      <div className='z-50'>
      <Consent setOpen={setOpen} message={"Sign Out?"} action={logout} />
      </div>
    ) : null}
    <div className="flex items-center justify-between w-full text-lg font-bold ">
      {/* home link */}
      <div className="w-fit p-1  flex-center  ">
        <Link to="/">
          <TheIcon Icon={RiHome2Line} size={"25"} color={""}/>
        </Link>
      </div>
      {/* theme toggle */}
      <div className="w-[50%] md:w-[50%] p-1  flex-center">
        <Search/>
      </div>
      <div className="w-fit p-1  flex-center">
        <TheIcon Icon={mode} size={"25"} color={""} iconAction={toggle} />
      </div>
      {/* test */}

      <div className="w-fit p-1  flex-center ">
        {/* <Link to="/test">
         test
        </Link>
        <div> {"  "}</div>
        <Link to="/repo/tsconfig.json--```--benawad">
          repo
        </Link>
        <div> {"  "}</div>
        <Link to="/profile/oswhytecodes">
          profile
        </Link> */}

        <div
          onClick={() => setOpen(true)}
          className="h-[40px] w-10 hover:bg-slate-700 m-1"
        >
          <img
            className="h-[80%] w-fit rounded-[50%] m-1 border border-white"
            src={(avatarUrl)}
            alt=""
            height={"20px"}
            width={"20px"}
           />
        </div>


      </div>





    </div>
  </div>
);
}
