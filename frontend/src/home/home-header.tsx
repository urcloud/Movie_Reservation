import { Link } from 'wouter';
import { cx } from '../commons/cx';
import { Button } from '../commons/button';
import { useAuth } from '../context/auth-context';

export const HomeHeader = () => {
  const { user, logout, loading } = useAuth();

  // 초기 로딩 시 깜빡임 방지
  if (loading) return null;

  return (
    <header
      className={cx(
        'sticky',
        'top-0',
        'z-40',
        'flex items-center justify-between',
        'px-3 py-2',
        'bg-primary/60',
        'border-b'
      )}
    >
      {/* 왼쪽 로고 */}
      <div className="flex items-center gap-3">
        <Link to="/" className="inline-block text-lg font-semibold">
          25.2 Movie
        </Link>
      </div>

      {/* 오른쪽 메뉴 */}
      <div className="flex items-center gap-3">
        <nav className="flex gap-4 items-center text-sm">
          {user ? (
            <>
              <span className="text-gray-700">
                {user.member_name} 님 환영합니다
              </span>
              <Button
                onClick={logout}
                className="hover:underline"
              >
                로그아웃
              </Button>
              <Link to="/reservations">
                <span className="hover:underline">내 예매내역</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <span className="hover:underline">로그인/회원가입</span>
              </Link>
              <Link to="/reservations">
                <span className="hover:underline">예매내역조회</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
