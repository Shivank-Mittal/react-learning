import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import authService from '../../data/appWrite/auth';
import { accountInfo } from '../../data/types';
import { loginAction } from '../../store/slice/authSlice';
import Input from '../Input';
import Button from './Button';
import BLOG_ROUTE, { BLOG_FULL_ROUTE } from '../../constants/router';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<accountInfo>();

  const create = async (data: accountInfo) => {
    setError('');

    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        dispatch(loginAction(userData));
        navigate(BLOG_ROUTE.All);
      }
    } catch (currentError) {
      setError('Error while creating account: ' + currentError);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <h2 className="text-center text-2xl font-bold leading-tight">
          {' '}
          Sign up to create account{' '}
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to={BLOG_FULL_ROUTE.LOGIN}
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create, (error) => console.log(error))}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              type="text"
              className=""
              props={register('name', { required: true })}
            />

            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              className=""
              props={register('email', {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
              })}
            />

            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              props={register('password', { required: true, minLength: 8 })}
            />

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
