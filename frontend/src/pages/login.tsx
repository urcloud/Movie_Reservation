import { useState } from 'react';
import { Input } from '../commons/input';
import { useLocation } from 'wouter';
import { Button } from '../commons/button';
import { useAuth } from '../context/auth-context';

export function LoginForm() {
  const { loading, login } = useAuth();
  const [, setLocation] = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  // 입력 변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const goToSignup = () => setLocation('/signup');

  // 로그인 요청
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const { email, password } = formData;
      const ok = await login(email, password);
      if (ok) {
        alert('로그인이 완료되었습니다.');
        setLocation('/');
      }
    } catch (err: any) {
      console.error('로그인 에러:', err);

      // AuthContext의 login에서 에러를 throw 하면 여기서 잡힘
      setErrorMsg('이메일 또는 비밀번호를 확인해 주세요.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-2xl p-8 w-96'>
        <h2 className='text-2xl font-bold text-center mb-6'>로그인</h2>

        <form onSubmit={handleSubmit} className='flex flex-col space-y-3'>
          <Input
            type='email'
            name='email'
            placeholder='이메일'
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            type='password'
            name='password'
            placeholder='비밀번호'
            value={formData.password}
            onChange={handleChange}
            required
          />

          {errorMsg && <p className='text-red-500 text-sm'>{errorMsg}</p>}

          <Button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-400 text-white py-2 rounded hover:bg-primary disabled:opacity-50'
          >
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </form>

        <Button
          className='w-full pr-3 text-xs text-right text-gray-600 hover:text-black'
          onClick={goToSignup}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
