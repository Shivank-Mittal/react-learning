
import { useDispatch } from 'react-redux';
import AuthService from '../../data/appWrite/auth'
import { loginInfo } from '../../data/types';
import {loginAction} from '../../store/slice/authSlice'
import {  Link, useNavigate } from 'react-router';
import Input from '../Input';
import {useForm} from 'react-hook-form'
import {useState} from 'react'
import Button from './Button';
import { Rings } from 'react-loading-icons'
import { setLoadingAction } from '../../store/slice/loadSlice';
import { useIsLoading } from '../../store/selector/load.selector';
import BLOG_ROUTE, { BLOG_FULL_ROUTE } from '../../constants/router';

export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<loginInfo>()
    const [error, setError] = useState("")
    const isLoading = useIsLoading();

    const login = async (data: loginInfo) => {
        setError("");
        try {
            dispatch(setLoadingAction(true))
            const session = await AuthService.login(data);
            const testPromise = new Promise<void>(res => {
                setTimeout(async () => {
                    if(session) {
                        const user = await AuthService.currentUser();
                        if(user) {
                            dispatch(loginAction(user))
                            navigate(BLOG_ROUTE.All)
                        }
                        res();
                    }
                }, 2000)
            })

            await testPromise
        } catch (error) {
            console.log( "Error Accrued while login with error: ", error)
        } finally {
            dispatch(setLoadingAction(false))
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to = {BLOG_FULL_ROUTE.SIGN_UP}
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(login, () => console.log("error"))} className='mt-8'>
                    <div className='space-y-5'>
                        <Input 
                            label= "Email"
                            placeholder='Enter your email please'
                            type = "email" 
                            props={register("email", 
                                {
                                    required: true, 
                                    validate: { matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",}
                                }
                            )} 
                        />

                        <Input 
                            label= "Password"
                            placeholder = "Enter your password please" 
                            type = "password" 
                            props={register("password", 
                                {
                                    required: true, 
                                })
                            } 
                        />

                        <Button type='submit'> Login
                            {isLoading && <Rings></Rings>}
                        </Button> 
                    </div>

                </form>
            </div>
        </div>
    )
}