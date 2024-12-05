"use client"

import { useMutation } from '@tanstack/react-query';
import { logInAPI } from '../api/user'; // 방금 만든 로그인 API 함수
import { useForm, SubmitHandler } from 'react-hook-form';

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  // useMutation 훅을 사용하여 로그인 처리
  const { mutate, error, isPending } = useMutation({
    mutationFn: logInAPI,
    onSuccess: (data) => {
      // 예: 로그인 성공 시 accessToken을 localStorage나 상태 관리 라이브러리에 저장
      localStorage.setItem('authorization', data.accessToken);
    },
    onError: (error) => {
      console.error('Login failed:', error); // 로그인 실패 시 처리
    },
  });

  // 폼 제출 시 실행되는 함수
  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    mutate(data); // 로그인 요청
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
        
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Email 필드 */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              {...register('email', {
                required: 'Email is required', 
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email format'
                }
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password 필드 */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* 에러 메시지 */}
          {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}

          {/* 제출 버튼 */}
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isPending} // 로딩 중에는 버튼 비활성화
            >
              {isPending ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
