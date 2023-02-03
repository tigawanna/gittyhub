
import React from 'react'
import { GqlErr } from '../../utils/useCheckToken';
import { useLocalStoreValues } from '../../store';
import { FormInput } from '../Shared/form/FormInput';
import { PlainFormButton } from '../Shared/form/FormButton';
import { OAuthLogin } from './OAuthLogin';

interface LoginProps {
    initerror?: GqlErr | null
}

interface RequiredLoginFormFields {
    token: string
}

export const UnAuthRoot: React.FC<LoginProps> = ({ initerror }) => {
    const local_vals = useLocalStoreValues()
    const [input, setInput] = React.useState<RequiredLoginFormFields>({
        token:local_vals.localValues.ghaccess as string,
    });
    console.log("gh access ===> ", local_vals.localValues.ghaccess)
    const [error, setError] = React.useState({ name: "token", message: initerror?.message as string });
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(false)
    }, [error])

    const updateToken = useLocalStoreValues(state => state.updateToken)


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setInput(prev => {
            return { ...prev, [e.target.id]: e.target.value };
        });
        if (error.message !== "" || error.name !== "") {
            setError({ name: "", message: "" });
        }
    };


    const handleSubmit = async (e: React.BaseSyntheticEvent<object, any, any>) => {
        e.preventDefault()
        // console.log(input)
        setLoading(true)
        updateToken(input.token)

    };


    const disableButton = (vals: typeof input) => {
        if (vals.token !== "" && !loading) {
            return false;
        }
        return true;
    };

    return (
        <div className='w-full min-h-screen h-full flex flex-col items-center justify-center gap-3'>

            <div className='w-[95%] md:w-[60%] '>
                <div className='font-bold text bold w-fiull text-center'>
                    The github Graphql API needs authentication
                </div>

            </div>


            <form onSubmit={handleSubmit}
                className="w-[95%] md:w-[60%] h-full rounded-xl p-5 border-2
                flex  flex-col items-center justify-center gap-2
                bg-white dark:bg-black">
                <FormInput<RequiredLoginFormFields>
                    error={error}
                    handleChange={handleChange}
                    input={input}
                    prop="token"
                    label="Use Github personal access token"
                />
                <PlainFormButton
                    disabled={disableButton(input) || loading}
                    isSubmitting={loading}
                    label={" submit "}
                />

            </form>
            <div className='w-[95%] md:w-[60%] '>
                <div className='text-lg font-bold text bold w-fiull text-center'>
                    Or Login with
                </div>
                <OAuthLogin />
            </div>
        </div>
    );
}
