import { Link } from 'wouter';
import { Button } from '../commons/button';

export const HomeHeader = () => {
  return (
    <header className="flex absolute top-5 right-10">
          <Link to="/signup">
          <Button
            className="text-blue-600 hover:underline"
            >
            회원가입
          </Button>
          </Link>
          
          <Link to="/login">
          <Button
          className="text-blue-600 hover:underline"
          >
            로그인
          </Button>
          </Link>
      </header>
  );
};
