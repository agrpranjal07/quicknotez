'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SignupFormInputs {
  username: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    try {
      await axios.post('/api/auth/signup', data);
      toast.success('Signup successful! Check your email to verify your account.');
      router.push('/login');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-[var(--pink-light)] p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="flex text-4xl justify-center mb-4 text-[var(--purple-deep)]">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-[var(--purple-deep)]">Username</label>
          <input 
            {...register('username', { required: 'Username is required' })}
            className="w-full p-2 border rounded mt-1 op-5 opacity-20 border-[var(--purple-deep)]" placeholder='john238'
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-[var(--purple-deep)]">Email</label>
          <input 
            {...register('email', { required: 'Email is required' })}
            className="w-full p-2 border rounded mt-1 op-5 opacity-20 border-[var(--purple-deep)]" placeholder='john238@example.com'
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-[var(--purple-deep)]">Password</label>
          <input 
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full p-2 border rounded mt-1 op-5 opacity-20 border-[var(--purple-deep)]" placeholder=''
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <button type="submit" className="w-full text-2xl hover:underline bg-[var(--pink-soft)] text-[var(--purple-deep)] p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
