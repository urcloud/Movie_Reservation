// src/pages/booking-detail.tsx
import { useMemo, useState } from 'react';
import { PageLayout } from '../layouts/page-layout';
import { ContentLayout } from '../layouts/content-layout';
import { Modal } from '../commons/modal';
import { Button } from '../commons/button';
import { Link } from 'wouter';
import { Bookings } from '../booking/bookings';

interface Props { id: string; }

export const MemberBookingDetail= ({ id }: Props) => {
  const data = useMemo(() => Bookings.getMemberById(String(id)), [id]);
  const [isCanceled, setIsCanceled] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDone, setShowDone] = useState(false);

  if (!data) {
    return (
      <PageLayout>
        <ContentLayout>
          <p className="text-red-600">예매 내역을 찾을 수 없습니다.</p>
          <Link to="/mem-reservations">
            <Button className="mt-3 bg-blue-500 text-white rounded px-4 py-2">목록으로</Button>
          </Link>
        </ContentLayout>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <ContentLayout>
        <h1 className="text-xl font-bold mb-4">예매 상세</h1>

        <div className="border p-4 rounded shadow bg-gray-50">
          <p>예매번호: {data.id}</p>
          <p>영화: {data.movie}</p>
          <p>날짜/시간: {data.date} {data.time}</p>
          <p>상영관: {data.theater}</p>
          <p>좌석: {data.seat}</p>
          <p className="mt-2">
            상태:{' '}
            {isCanceled ? <span className="text-red-600 font-semibold">취소됨</span>
                        : <span className="text-green-600 font-semibold">예매완료</span>}
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <Link to="/mem-reservations">
            <Button className="bg-blue-500 text-white rounded px-4 py-2">목록으로</Button>
          </Link>
          <Button
            onClick={() => setShowConfirm(true)}
            disabled={isCanceled}
            className={`rounded px-4 py-2 text-white ${isCanceled ? 'bg-gray-400' : 'bg-red-500'}`}
          >
            {isCanceled ? '취소 완료' : '예매 취소'}
          </Button>
        </div>

        {/* 확인 모달 */}
        {showConfirm && (
          <Modal onClose={() => setShowConfirm(false)}>
            <div className="w-72">
              <h2 className="text-lg font-bold mb-3">예매 취소</h2>
              <p className="mb-4">정말로 예매를 취소하시겠습니까?</p>
              <div className="flex justify-end gap-2">
                <Button onClick={() => setShowConfirm(false)} className="bg-gray-200 rounded px-3 py-2">아니요</Button>
                <Button onClick={() => { setIsCanceled(true); setShowConfirm(false); setShowDone(true); }}
                        className="bg-red-500 text-white rounded px-3 py-2">
                  예, 취소합니다
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* 완료 모달 */}
        {showDone && (
          <Modal onClose={() => setShowDone(false)}>
            <div className="w-72">
              <h2 className="text-lg font-bold mb-3">처리 완료</h2>
              <p className="mb-4">예매가 취소되었습니다.</p>
              <div className="flex justify-end gap-2">
                <Button onClick={() => setShowDone(false)} className="bg-gray-200 rounded px-3 py-2">확인</Button>
                <Link to="/mem-reservations">
                  <Button className="bg-blue-500 text-white rounded px-3 py-2">목록으로</Button>
                </Link>
              </div>
            </div>
          </Modal>
        )}
      </ContentLayout>
    </PageLayout>
  );
};
