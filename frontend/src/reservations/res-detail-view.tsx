import { useState } from 'react';
import { PageLayout } from '../layouts/page-layout';
import { ContentLayout } from '../layouts/content-layout';
import { Modal } from '../commons/modal';
import { Button } from '../commons/button';
import { Link } from 'wouter';

export interface ReservLite {
  id: string;
  movie: string;
  date: string;
  time: string;
  theater: string;
  seat: string;
}

export function ReservDetailView({
  Reserv,
  backTo = '/',
  title = '예매 상세',
}: {
  Reserv: ReservLite;
  backTo?: string;
  title?: string;
}) {
  const [isCanceled, setIsCanceled] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDone, setShowDone] = useState(false);

  const openConfirm = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);
  const onCancel = () => {
    setIsCanceled(true);      // 표지용: UI 상태만 변경
    setShowConfirm(false);
    setShowDone(true);
  };
  const closeDone = () => setShowDone(false);

  return (
    <PageLayout>
      <ContentLayout>
        <h1 className="text-xl font-bold mb-4">{title}</h1>

        <div className="border p-4 rounded shadow bg-gray-50">
          <p>예매번호: {Reserv.id}</p>
          <p>영화: {Reserv.movie}</p>
          <p>날짜/시간: {Reserv.date} {Reserv.time}</p>
          <p>상영관: {Reserv.theater}</p>
          <p>좌석: {Reserv.seat}</p>
          <p className="mt-2">
            상태:{' '}
            {isCanceled ? (
              <span className="text-red-600 font-semibold">취소됨</span>
            ) : (
              <span className="text-green-600 font-semibold">예매완료</span>
            )}
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <Link to={backTo}>
                  <Button className="bg-blue-500 text-white rounded px-3 py-2">목록으로</Button>
                </Link>
          <Button
            onClick={openConfirm}
            disabled={isCanceled}
            className={`rounded px-4 py-2 text-white ${isCanceled ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500'}`}
          >
            {isCanceled ? '취소 완료' : '예매 취소'}
          </Button>
        </div>

        {/* 확인 모달 */}
        {showConfirm && (
          <Modal onClose={closeConfirm}>
            <div className="w-72">
              <h2 className="text-lg font-bold mb-3">예매 취소</h2>
              <p className="mb-4">정말로 예매를 취소하시겠습니까?</p>
              <div className="flex justify-end gap-2">
                <Button onClick={closeConfirm} className="bg-gray-200 rounded px-3 py-2">아니요</Button>
                <Button onClick={onCancel} className="bg-red-500 text-white rounded px-3 py-2">예, 취소합니다</Button>
              </div>
            </div>
          </Modal>
        )}

        {/* 완료 모달 */}
        {showDone && (
          <Modal onClose={closeDone}>
            <div className="w-72">
              <h2 className="text-lg font-bold mb-3">처리 완료</h2>
              <p className="mb-4">예매가 취소되었습니다.</p>
              <div className="flex justify-end gap-2">
                <Button onClick={closeDone} className="bg-gray-200 rounded px-3 py-2">확인</Button>
                <Link to={backTo}>
                  <Button className="bg-blue-500 text-white rounded px-3 py-2">목록으로</Button>
                </Link>
              </div>
            </div>
          </Modal>
        )}
      </ContentLayout>
    </PageLayout>
  );
}
