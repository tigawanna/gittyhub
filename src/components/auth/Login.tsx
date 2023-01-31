import React from 'react'
import { GqlErr } from '../../utils/useCheckToken';
import { useLocalStoreValues } from './../../store';
import { FormInput } from './../Shared/form/FormInput';

interface LoginProps {
  initerror?: GqlErr | null
}
export interface FormOptions {
    field_name: string;
    field_type: string;
    default_value: string | number
    options?: { name: string; value: string }[]
}
interface Validate {
    input:{token:string|null};
    setError: (error: { name: string; message: string }) => void;
}
interface RequiredLoginFormFields{
  token:string
}

export const Login: React.FC<LoginProps> = ({initerror}) => {
  const [input, setInput] = React.useState<RequiredLoginFormFields>({
    token:"",
  });
  const [error, setError] = React.useState({ name: "", message: "" });
const updateToken=useLocalStoreValues(state=>state.updateToken)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInput(prev => {
      return { ...prev, [e.target.id]: e.target.value };
    });
    if (error.message !== "" || error.name !== "") {
      setError({ name: "", message: "" });
    }
  };


const handleSubmit = async (data: any) => {
  updateToken(data.token)

};


const disableButton = (vals: typeof input) => {
    if (vals.token !== "") {
      return false;
    }
    return true;
};

return (
 <div className='w-full min-h-screen h-full flex-center'>
    <form onSubmit={handleSubmit}
      className="w-[90%] md:w-[60%] h-full rounded-xl p-5 border-2
                flex  flex-col items-center justify-center gap-2
                bg-white dark:bg-black">
      <FormInput<RequiredLoginFormFields>
        error={error}
        handleChange={handleChange}
        input={input}
        prop="token"
        label="Github personal access token"
      />
      
      </form>
 </div>
);
}
