import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { PageLayout } from '../layouts/page-layout';
import { ContentLayout } from '../layouts/content-layout';
import { Button } from '../commons/button';
import { mockScreeningSeat } from '../data/seats';
import type { ScreeningSeat } from '../models/screeningSeat';

export const MovieReservation = () => {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [seatLayout, setSeatLayout] = useState<ScreeningSeat[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setSeatLayout(mockScreeningSeat);
  }, [id]);

  const toggleSeatSelection = (seatId: number) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seatId)
        ? prevSeats.filter((id) => id !== seatId)
        : [...prevSeats, seatId]
    );
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert('좌석을 선택해주세요!');
      return;
    }

    // 예매 화면으로 좌석 정보 전달 (localStorage 사용)
    localStorage.setItem(
      'selectedSeats',
      JSON.stringify(selectedSeats)
    );
    localStorage.setItem('movieId', id);

    setShowPopup(false);
    navigate(`/booking/${id}/payment`); // 예매하기 페이지로 이동
  };

  const sectionSize = Math.floor(seatLayout.length / 3);
  const leftSeats = seatLayout.slice(0, sectionSize);
  const centerSeats = seatLayout.slice(sectionSize, sectionSize * 2);
  const rightSeats = seatLayout.slice(sectionSize * 2);

  return (
    <PageLayout>
      <ContentLayout>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-4">영화 예매</h1>
          <p className="text-lg mb-4">영화 번호: {id}</p>
          <Button
            className="bg-green-500 text-white px-6 py-2 rounded"
            onClick={() => setShowPopup(true)}
          >
            좌석 선택
          </Button>
        </div>

        {/* 좌석 선택 팝업 */}
        {showPopup && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white p-6 rounded-lg w-[90%] md:w-[70%] lg:w-[60%]">
              <h2 className="text-xl font-bold mb-6 text-center">좌석 선택</h2>

              <div className="bg-gray-200 text-center py-2 mb-4 font-semibold rounded">
                스크린
              </div>

              {/* 좌석 구역 */}
              <div className="flex justify-center space-x-8">
                {[leftSeats, centerSeats, rightSeats].map((section, i) => (
                  <div
                    key={i}
                    className={`grid ${
                      i === 1 ? 'grid-cols-8' : 'grid-cols-4'
                    } gap-2`}
                  >
                    {section.map((seat) => (
                      <button
                        key={seat.seatId}
                        onClick={() => toggleSeatSelection(seat.seatId)}
                        className={`w-8 h-8 rounded text-xs font-medium flex items-center justify-center ${
                          seat.isReserved
                            ? 'bg-red-600 text-white cursor-not-allowed'
                            : selectedSeats.includes(seat.seatId)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-300 text-black'
                        }`}
                        disabled={seat.isReserved}
                      >
                        {seat.seatId}
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              {/* 색상 안내 */}
              <div className="flex justify-center space-x-6 mt-6 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-gray-300 rounded" />
                  <span>예매 가능</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-red-600 rounded" />
                  <span>예매 불가</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-blue-500 rounded" />
                  <span>선택됨</span>
                </div>
              </div>

              {/* 하단 버튼 */}
              <div className="flex justify-between mt-6">
                <Button
                  className="bg-gray-500 text-white px-6 py-2 rounded"
                  onClick={() => setShowPopup(false)}
                >
                  취소
                </Button>
                <Button
                  className="bg-blue-500 text-white px-6 py-2 rounded"
                  onClick={handleBooking}
                >
                  예매하기
                </Button>
              </div>
            </div>
          </div>
        )}
      </ContentLayout>
    </PageLayout>
  );
};
