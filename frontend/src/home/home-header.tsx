import { Link, useLocation } from 'wouter';
import { cx } from '../commons/cx';
import { useEffect, useState } from 'react';
import { Button } from '../commons/button';

export const HomeHeader = () => {
  const [, setLocation] = useLocation();

  const [userEmail, setUserEmail] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!userEmail);

  //  로그인 상태를 localStorage에서 읽고 실시간으로 갱신
  useEffect(() => {
    const updateLoginState = () => {
      const email = localStorage.getItem('userEmail');
      setUserEmail(email);
      setIsLoggedIn(!!email);
    };

    // 초기 실행
    updateLoginState();

    // 다른 탭(localStorage 변화 감지)
    window.addEventListener('storage', updateLoginState);

    // 같은 탭에서도 주기적으로 확인 (필요하면 유지, 아니면 지워도 됨)
    const interval = setInterval(updateLoginState, 1000);

    return () => {
      window.removeEventListener('storage', updateLoginState);
      clearInterval(interval);
    };
  }, []);

  //  로그아웃
  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail(null);
    alert('로그아웃 되었습니다.');
    setLocation('/');
  };

  // 예매내역 버튼 클릭: 로컬에 이메일 있으면 예매조회, 없으면 로그인
  const handleReservationsClick = () => {
    const email = localStorage.getItem('userEmail');
    if (email) {
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
          {isLoggedIn ? (
            <>
              <span className="text-gray-700">
                {userEmail} 님 환영합니다
              </span>
              <Button
                onClick={handleLogout}
                className="hover:underline"
              >
                로그아웃
              </Button>
              {/* 로그인 상태에서도 클릭 로직은 동일하게 handleReservationsClick 사용 */}
              <button
                type="button"
                onClick={handleReservationsClick}
                className="hover:underline"
              >
                내 예매내역
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <span className="hover:underline">로그인/회원가입</span>
              </Link>
              <button
                type="button"
                onClick={handleReservationsClick}
                className="hover:underline"
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
