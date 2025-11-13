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
  onDelete, //  추가: 부모가 넘겨주는 삭제 콜백
}: {
  Reserv: ReservLite;
  backTo?: string;
  title?: string;
  onDelete: (id: string) => void; //  필수 콜백
}) {
  // 상태표시는 더이상 필요 없지만(삭제가 되면 목록에서 사라짐), UI는 유지 가능
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDone, setShowDone] = useState(false);

  const openConfirm = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);

  // ✅ 확인 클릭 시 실제 삭제 실행
  const onCancel = () => {
    onDelete(Reserv.id);    // 부모에서 filter로 제거
    setShowConfirm(false);
    setShowDone(true);      // 완료 모달(선택 사항)
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
        </div>

        <div className="mt-4 flex gap-2">
          <Link to={backTo}>
            <Button type="button" className="bg-blue-500 text-white rounded px-3 py-2">목록으로</Button>
          </Link>
          <Button
            type="button"
            onClick={openConfirm}
            className="rounded px-4 py-2 text-white bg-red-500"
          >
            예매 취소
          </Button>
        </div>

        {/* 확인 모달 */}
        {showConfirm && (
          <Modal onClose={closeConfirm}>
            <div className="w-72">
              <h2 className="text-lg font-bold mb-3">예매 취소</h2>
              <p className="mb-4">정말로 예매를 취소하시겠습니까? (삭제됩니다)</p>
              <div className="flex justify-end gap-2">
                <Button type="button" onClick={closeConfirm} className="bg-gray-200 rounded px-3 py-2">아니요</Button>
                <Button type="button" onClick={onCancel} className="bg-red-500 text-white rounded px-3 py-2">예, 취소합니다</Button>
              </div>
            </div>
          </Modal>
        )}

        {/* 완료 모달  */}
        {showDone && (
          <Modal onClose={closeDone}>
            <div className="w-72">
              <h2 className="text-lg font-bold mb-3">처리 완료</h2>
              <p className="mb-4">예매가 삭제되었습니다.</p>
              <div className="flex justify-end gap-2">
                <Button type="button" onClick={closeDone} className="bg-gray-200 rounded px-3 py-2">확인</Button>
                <Link to={backTo}>
                  <Button type="button" className="bg-blue-500 text-white rounded px-3 py-2">목록으로</Button>
                </Link>
              </div>
            </div>
          </Modal>
        )}
      </ContentLayout>
    </PageLayout>
  );
}
