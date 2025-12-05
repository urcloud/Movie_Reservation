import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { PageLayout } from "../layouts/page-layout";
import { ContentLayout } from "../layouts/content-layout";
import { Button } from "../commons/button";
import type { Screening, ScreeningWithTheater } from "../models/screening";
import type { ScreeningSeat } from "../models/screeningSeat";
import type { Theater } from "../models/theater";

export const MovieReservation = () => {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();

  const [screenings, setScreenings] = useState<ScreeningWithTheater[]>([]);
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(null);
  const [theater, setTheater] = useState<Theater | null>(null);
  const [seatLayout, setSeatLayout] = useState<ScreeningSeat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState<string[]>([]);
  const [showSeats, setShowSeats] = useState(false);

  useEffect(() => {
    const fetchScreenings = async () => {
      try {
        const res = await fetch(`/api/screenings?movie_id=${id}`);
        const data = await res.json();
        setScreenings(data.screenings || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchScreenings();
  }, [id]);

  const handleSelectScreening = async (screening: Screening) => {
    setSelectedScreening(screening);

    try {
      const theaterRes = await fetch(`/api/screenings/${screening.id}/theater`);
      const theaterData = await theaterRes.json();
      setTheater(theaterData.theater || null);

      const seatsRes = await fetch(`/api/screenings/${screening.id}/seats`);
      const seatsData = await seatsRes.json();
      setSeatLayout(seatsData.seats || []);

      setShowSeats(true);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSeatSelection = (screeningSeatId: number) => {
    setSelectedSeats((prev) =>
      prev.includes(screeningSeatId)
        ? prev.filter((id) => id !== screeningSeatId)
        : [...prev, screeningSeatId]
    );

    const seat = seatLayout.find((s) => s.id === screeningSeatId);
    if (!seat) return;

    setSelectedSeatNumbers((prev) =>
      prev.includes(seat.seat_number)
        ? prev.filter((n) => n !== seat.seat_number)
        : [...prev, seat.seat_number]
    );
  };

  const handleBooking = () => {
    if (!selectedScreening) return;
    if (selectedSeats.length === 0) {
      alert("좌석을 선택해주세요!");
      return;
    }

    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    localStorage.setItem("selectedSeatNumbers", JSON.stringify(selectedSeatNumbers));
    localStorage.setItem("screeningId", String(selectedScreening.id));

    navigate(`/booking/${selectedScreening.id}/payment`);
  };

  return (
    <PageLayout>
      <ContentLayout>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">🎬 영화 예매</h1>
          <p className="text-lg mb-4">
            영화: <strong>{screenings[0]?.movie_title}</strong>
          </p>
        </div>

        {!showSeats && (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-xl font-semibold mb-2">상영 시간 선택</h2>
            {screenings.length === 0 && <p>해당 영화의 상영 일정이 없습니다.</p>}

            {screenings.map((s) => (
              <div
                key={s.id}
                className="border p-4 rounded w-[90%] md:w-[60%] flex justify-between items-center"
              >
                <div>
                  <p>
                    상영일: <strong>{new Date(s.screening_date).toLocaleDateString()}</strong>
                  </p>
                  <p>
                    시간: {s.start_time} ~ {s.end_time}
                  </p>
                  <p>가격: {s.ticket_price.toLocaleString()}원</p>
                  <p>상영관: {s.theater_name}</p>
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

        {showSeats && selectedScreening && theater && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold mb-4">
              🎟 {theater.theater_name} 좌석 선택
            </h2>

            <div className="bg-gray-200 py-2 mb-4 rounded font-semibold">
              스크린
            </div>

            <div className="flex flex-col items-center justify-center mt-4 w-full">
              {Array.from({ length: theater.seat_row }).map((_, rowIdx) => {
                const start = rowIdx * theater.seat_col;
                const end = (rowIdx + 1) * theater.seat_col;
                const rowSeats = seatLayout.slice(start, end);

                const third = Math.floor(rowSeats.length / 3);
                const remainder = rowSeats.length % 3;

                const leftSeats = rowSeats.slice(0, third);
                const centerSeats = rowSeats.slice(third, third + third + remainder);
                const rightSeats = rowSeats.slice(third + third + remainder);

                const renderSeat = (seat: ScreeningSeat) => {
                  return (
                    <button
                      key={seat.id}
                      onClick={() => toggleSeatSelection(seat.id)}
                      disabled={seat.is_reserved}
                      className={`w-8 h-8 rounded text-xs font-medium flex items-center justify-center
                        ${
                          seat.is_reserved
                            ? "bg-red-600 text-white cursor-not-allowed"
                            : selectedSeats.includes(seat.id)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-black"
                        }`}
                    >
                      {seat.seat_number}
                    </button>
                  );
                };

                return (
                  <div key={rowIdx} className="flex w-full justify-between mb-2">
                    <div className="flex gap-2">{leftSeats.map(renderSeat)}</div>
                    <div className="flex gap-2 justify-center">{centerSeats.map(renderSeat)}</div>
                    <div className="flex gap-2">{rightSeats.map(renderSeat)}</div>
                  </div>
                );
              })}
            </div>

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
