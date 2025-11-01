import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { PageLayout } from "../layouts/page-layout";
import { ContentLayout } from "../layouts/content-layout";
import { Button } from "../commons/button";
import { mockScreenings } from "../data/screenings";
import { mockTheaters } from "../data/theaters";
import { mockScreeningSeats } from "../data/screeningSeats";
import { mockSeats } from "../data/seats"; // Seat 정보
import type { Screening } from "../models/screening";
import type { ScreeningSeat } from "../models/screeningSeat";
import type { Theater } from "../models/theater";

export const MovieReservation = () => {
  const { id } = useParams<{ id: string }>(); // movieId
  const [, navigate] = useLocation();

  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(null);
  const [theater, setTheater] = useState<Theater | null>(null);
  const [seatLayout, setSeatLayout] = useState<ScreeningSeat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [showSeats, setShowSeats] = useState(false);

  // 해당 영화의 상영 목록만 필터링
  useEffect(() => {
    const filtered = mockScreenings.filter((s) => s.movieId === Number(id));
    setScreenings(filtered);
  }, [id]);

  // 상영 선택 시 실행
  const handleSelectScreening = (screening: Screening) => {
    setSelectedScreening(screening);
    const t = mockTheaters.find((t) => t.theaterId === screening.theaterId);
    setTheater(t || null);

    // 해당 상영관 좌석 가져오기
    const layout = mockScreeningSeats.filter(
      (seat) =>
        seat.theaterId === screening.theaterId &&
        seat.screeningId === screening.screeningId
    );
    setSeatLayout(layout);
    setShowSeats(true);
  };

  const toggleSeatSelection = (screeningSeatId: number) => {
    setSelectedSeats((prev) =>
      prev.includes(screeningSeatId)
        ? prev.filter((id) => id !== screeningSeatId)
        : [...prev, screeningSeatId]
    );
  };

  const handleBooking = () => {
    if (!selectedScreening) return;
    if (selectedSeats.length === 0) {
      alert("좌석을 선택해주세요!");
      return;
    }

    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    localStorage.setItem("screeningId", String(selectedScreening.screeningId));

    navigate(`/booking/${selectedScreening.screeningId}/payment`);
  };

  return (
    <PageLayout>
      <ContentLayout>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">🎬 영화 예매</h1>
          <p className="text-lg mb-4">영화 번호: {id}</p>
        </div>

        {/* 상영 선택 단계 */}
        {!showSeats && (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-xl font-semibold mb-2">상영 시간 선택</h2>
            {screenings.length === 0 && <p>해당 영화의 상영 일정이 없습니다.</p>}

            {screenings.map((s) => (
              <div
                key={s.screeningId}
                className="border p-4 rounded w-[90%] md:w-[60%] flex justify-between items-center"
              >
                <div>
                  <p>
                    상영일: <strong>{s.screeningDate.toLocaleDateString()}</strong>
                  </p>
                  <p>
                    시간: {s.startTime} ~ {s.endTime}
                  </p>
                  <p>가격: {s.ticketPrice.toLocaleString()}원</p>
                </div>
                <Button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleSelectScreening(s)}
                >
                  선택
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* 좌석 선택 단계 */}
        {showSeats && selectedScreening && theater && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold mb-4">
              🎟 {theater.theaterName} 좌석 선택
            </h2>

            <div className="bg-gray-200 py-2 mb-4 rounded font-semibold">
              스크린
            </div>

            {/* 좌석 구역 */}
<div className="flex flex-col items-center justify-center mt-4">
  {Array.from({ length: theater.seatRow }).map((_, rowIdx) => (
    <div key={rowIdx} className="flex gap-2 mb-2">
      {Array.from({ length: theater.seatCol }).map((_, colIdx) => {
        // 좌석 번호를 row-col 기준으로 계산 (예: A1, A2, B1, B2)
        const seatIndex = rowIdx * theater.seatCol + colIdx;
        const screeningSeat = seatLayout[seatIndex];

        if (!screeningSeat) return <div key={colIdx} className="w-8 h-8" />;

        const seatInfo = mockSeats.find(
          (s) => s.seatId === screeningSeat.seatId
        );

        const seatLabel = seatInfo?.seatNumber || screeningSeat.seatId;

        return (
          <button
            key={screeningSeat.screeningSeatId}
            onClick={() => toggleSeatSelection(screeningSeat.screeningSeatId)}
            disabled={screeningSeat.isReserved}
            className={`w-8 h-8 rounded text-xs font-medium flex items-center justify-center
              ${
                screeningSeat.isReserved
                  ? "bg-red-600 text-white cursor-not-allowed"
                  : selectedSeats.includes(screeningSeat.screeningSeatId)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
          >
            {seatLabel}
          </button>
        );
      })}
    </div>
  ))}
</div>

            {/* 안내 색상 */}
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

            <div className="flex justify-between mt-6">
              <Button
                className="bg-gray-500 text-white px-6 py-2 rounded"
                onClick={() => setShowSeats(false)}
              >
                뒤로가기
              </Button>
              <Button
                className="bg-green-600 text-white px-6 py-2 rounded"
                onClick={handleBooking}
              >
                예매하기
              </Button>
            </div>
          </div>
        )}
      </ContentLayout>
    </PageLayout>
  );
};
