import React from 'react'
import { GqlErr } from '../../utils/useCheckToken';
import TheForm from '../Shared/form/TheForm';
import { useLocalStoreValues } from './../../store';

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

export const Login: React.FC<LoginProps> = ({initerror}) => {

const updateToken=useLocalStoreValues(state=>state.updateToken)
const handleSubmit = async (data: any) => {
  updateToken(data.token)

};

const validate = ({ input, setError }: Validate) => {
  return true
}

const form_input: FormOptions[] = [{ field_name: "token", field_type: "text", default_value: "" },]
return (
 <div className='w-full min-h-screen h-full flex-center'>
   <TheForm
     header={"SIGN-IN"}
     fields={form_input}
     submitFn={handleSubmit}
     validate={validate}
     initerror={initerror}
    />
 </div>
);
}
