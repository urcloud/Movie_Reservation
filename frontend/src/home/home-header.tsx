// 홈화면 헤더 용, 관리자,회원,비회원용으로 구분해서 공통에 넣어놓을 예정
// 일단은 비회원 기준
// 일단 러프하게 구현함

import { Link } from 'wouter';
import { cx } from '../commons/cx';

export const HomeHeader = () => {
  return (
    <header
      className={cx(
        'sticky',
        'top-0', //페이지 상단에 고정된 헤더 컴포넌트
        'z-40', //다른 요소들보다 위에 표시
        'flex items-center justify-between', //수직 중앙 정렬, 좌우 공간 분배, 주 축에서 좌우 끝으로 배치
        'px-3 py-2', //좌우,상하 패딩
        'bg-primary/60', // 60% 검정 반투명 배경 + 뒤쪽을 약간 블러 처리
        'border-b', //하단 테두리
      )}
    >
      {/* 타이틀 가로로 정렬하고 간격 유지 */}
      <div className='flex items-center gap-3'>
        {/* 홈화면 로고, 클릭 시 서버에 / 요청(전체 페이지 새로고침) */}
        <Link to='/' className='inline-block text-lg font-semibold'>
          25.2 Movie
        </Link>
      </div>

      {/* 오른쪽 버튼들 감싸는 컨테이너 */}
      <div className='flex items-center gap-3'>
        {/* 텍스트 링크, 가로 정렬, 아이템 간격, 수직 중앙 정렬, 글자크기 sm */}
        <nav className='flex gap-4 items-center text-sm'>
          <Link to='/login'>
            <span className='hover:underline'>로그인/회원가입</span>
          </Link>
          <Link to='/reservations'>
            <span className='hover:underline'>예매내역조회</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
