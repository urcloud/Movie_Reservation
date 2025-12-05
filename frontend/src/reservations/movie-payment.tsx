import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { PageLayout } from "../layouts/page-layout";
import { ContentLayout } from "../layouts/content-layout";
import { Button } from "../commons/button";
import type { Movie } from "../models/movie";
import type { Screening } from "../models/screening";

export const MoviePayment = () => {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [screening, setScreening] = useState<Screening | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [seatNumbers, setSeatNumbers] = useState<string[]>([]);
  const [authChecked, setAuthChecked] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const seats = localStorage.getItem("selectedSeats");
    const numbers = localStorage.getItem("selectedSeatNumbers");

    if (seats) setSelectedSeats(JSON.parse(seats));
    if (numbers) setSeatNumbers(JSON.parse(numbers));

    const fetchData = async () => {
      try {
        const screeningRes = await fetch(`/api/screenings/${id}`, {
          credentials: "include",
        });
        const screeningData = await screeningRes.json();
        setScreening(screeningData.screening);

        const movieRes = await fetch(`/api/screenings/${id}/movie`, {
          credentials: "include",
        });
        const movieData = await movieRes.json();
        setMovie(movieData.movie);
      } catch (err) {
        console.error("데이터 로딩 오류:", err);
      }
    };

    const checkAuth = async () => {
      try {
        setCheckingAuth(true);
        const res = await fetch("/api/auth/getUser", {
          method: "GET",
          credentials: "include",
        });
        if (res.status === 401) {
          alert("예매는 로그인한 사용자만 가능합니다. 로그인 페이지로 이동합니다.");
          setLocation("/login");
          return;
        }
        if (!res.ok) {
          alert("인증 확인 중 오류가 발생했습니다. 로그인 페이지로 이동합니다.");
          setLocation("/login");
          return;
        }

        setAuthChecked(true);
      } catch (err) {
        console.error("인증 확인 실패:", err);
        alert("인증 확인 중 오류가 발생했습니다. 로그인 페이지로 이동합니다.");
        setLocation("/login");
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth().then(() => {
      if (authChecked || !checkingAuth) {
        fetchData();
      }
    });

    if (!checkingAuth) {
      fetchData();
    }
  }, [id, authChecked, checkingAuth, setLocation]);

  const handleReservation = async () => {
    if (selectedSeats.length === 0) {
      alert("선택된 좌석이 없습니다.");
      return;
    }

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          screening_seat_ids: selectedSeats,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
          setLocation("/login");
          return;
        }
        alert(`예매 실패: ${data.message || "서버 오류"}`);
        return;
      }

      alert(
        `예매 완료!\n영화: ${movie?.title}\n상영관: ${screening?.theater_id}관\n좌석: ${seatNumbers.join(
          ", "
        )}`
      );
      
      localStorage.removeItem("selectedSeats");
      localStorage.removeItem("selectedSeatNumbers");

      setLocation("/");
    } catch (error) {
      console.error("예매 요청 오류:", error);
      alert("예매 요청 중 오류가 발생했습니다.");
    }
  };

  if (!movie || !screening) {
    return (
      <PageLayout>
        <ContentLayout>
          <p className="text-center mt-10 text-lg">예매 정보를 불러오는 중입니다...</p>
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

          <div className="flex justify-between items-center mt-6">
            <p className="text-gray-700 font-medium">예매를 진행하시겠습니까?</p>
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
