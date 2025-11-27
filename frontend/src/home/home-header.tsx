import { Link, useLocation } from 'wouter';
import { cx } from '../commons/cx';
import { Button } from '../commons/button';
import { useAuth } from '../context/auth-context';

export const HomeHeader = () => {
  const { user, logout, loading } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) return null;

  const handleReservationsClick = () => {
    if (user) {
      setLocation('/reservations');
    } else {
      alert('로그인이 필요한 서비스입니다.');
      setLocation('/login');
    }
  };

  return (
    <header
      className={cx(
        'sticky',
        'top-0',
        'z-40',
        'flex items-center justify-between',
        'px-3 py-2',
        'bg-primary/60',
        'border-b',
      )}
    >
      <div className='flex items-center gap-3'>
        <Link to='/' className='inline-block text-lg font-semibold'>
          25.2 Movie
        </Link>
      </div>

      <div className='flex items-center gap-3'>
        <nav className='flex gap-4 items-center text-sm'>
          {user ? (
            <>
              <span className='text-gray-700'>
                {user.member_name} 님 환영합니다
              </span>
              <Button onClick={logout} className='hover:underline'>
                로그아웃
              </Button>
              <button
                type='button'
                onClick={handleReservationsClick}
                className='hover:underline'
              >
                내 예매내역
              </button>
            </>
          ) : (
            <>
              <Link to='/login'>
                <span className='hover:underline'>로그인/회원가입</span>
              </Link>
              <button
                type='button'
                onClick={handleReservationsClick}
                className='hover:underline'
              >
                예매내역조회
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
