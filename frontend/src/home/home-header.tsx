import { Link } from 'wouter';

export const HomeHeader = () => {
  return (
    <header className="flex absolute top-5 right-10">
          <Link to="/signup">
          <button
            className="text-blue-600 hover:underline"
            >
            회원가입
          </button>
          </Link>
         
          <Link to="/login">
          <button
          className="text-blue-600 hover:underline"
          >
            로그인
          </button>
          </Link>
      </header>
  );
};
