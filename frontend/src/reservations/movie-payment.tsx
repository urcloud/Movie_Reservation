import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { PageLayout } from "../layouts/page-layout";
import { ContentLayout } from "../layouts/content-layout";
import { Button } from "../commons/button";
import type { Movie } from "../models/movie";
import type { Screening } from "../models/screening";

export const MoviePayment = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [screening, setScreening] = useState<Screening | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [seatNumbers, setSeatNumbers] = useState<string[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const seats = localStorage.getItem("selectedSeats");
    if (seats) setSelectedSeats(JSON.parse(seats));

    const fetchData = async () => {
      try {
        const screeningRes = await fetch(`/api/screenings/${id}`);
        const screeningData = await screeningRes.json();
        setScreening(screeningData);

        const movieRes = await fetch(`/api/movies/${screeningData.movieId}`);
        const movieData = await movieRes.json();
        setMovie(movieData);
      } catch (err) {
        console.error("데이터 로딩 오류:", err);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchSeatNumbers = async () => {
      if (selectedSeats.length === 0) return;

      try {
        const res = await fetch(`/api/screening-seats/convert`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ screeningSeatIds: selectedSeats }),
        });

        const data = await res.json();
        setSeatNumbers(data);
      } catch (err) {
        console.error("좌석 변환 오류:", err);
      }
    };

    fetchSeatNumbers();
  }, [selectedSeats]);

  const handleReservation = () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    alert(
      `예매 완료!\n영화: ${movie?.title}\n상영관: ${screening?.theater_id}관\n좌석: ${seatNumbers.join(
        ", "
      )}`
    );
  };

  if (!movie || !screening) {
    return (
      <PageLayout>
        <ContentLayout>
          <p className="text-center mt-10 text-lg">
            예매 정보를 불러오는 중입니다...
          </p>
        </ContentLayout>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <ContentLayout>
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
          <h1 className="text-2xl font-bold mb-4">🎟 예매 확인</h1>

          <div className="space-y-2 mb-6">
            <p>
              영화제목: <strong>{movie.title}</strong>
            </p>
            <p>장르: {movie.genre}</p>
            <p>상영관: {screening.theater_id}관</p>
            <p>
              상영 시간: {screening.start_time} ~ {screening.end_time}
            </p>
            <p>선택 좌석: {seatNumbers.join(", ")}</p>
            <p>
              총 금액: {(selectedSeats.length * screening.ticket_price).toLocaleString()}원
            </p>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              🎟️ 티켓 발송용 이메일 (필수)
            </label>
            <input
              type="email"
              className="border border-gray-300 rounded w-full p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-gray-700 font-medium">
              예매를 진행하시겠습니까?
            </p>
            <Button
              className="bg-blue-600 text-white px-6 py-2 rounded"
              onClick={handleReservation}
            >
              예매하기
            </Button>
          </div>
        </div>
      </ContentLayout>
    </PageLayout>
  );
};
