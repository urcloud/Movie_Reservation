-- 1. role 하나 만들기 (이미 있으면 생략)
INSERT INTO role (role_name) VALUES ('MEMBER') RETURNING id;
-- 예: 결과가 2라고 치고,
-- role_id = 2 사용

-- 2. user (회원) 만들기
INSERT INTO users (email, password, member_name, birthday, role_id)
VALUES ('user@example.com', 'dummy-password', '테스트유저', '2000-01-01', 2);

-- 3. theater 만들기
INSERT INTO theater (theater_name, total_seats, seat_row, seat_col)
VALUES ('강남 1관', 100, 10, 10)
RETURNING id;
-- 예: theater_id = 1

-- 4. seat 하나 만들기 (E5 같은 좌석)
INSERT INTO seat (theater_id, seat_number)
VALUES (1, 'E5')
RETURNING id;
-- 예: seat_id = 1

-- 5. movie 만들기
INSERT INTO movie (
  user_email, title, description,
  release_date, close_date,
  running_time, viewing_age, genre,
  director, main_actor
)
VALUES (
  'user@example.com',
  '테스트 영화',
  '테스트 상영용 영화입니다.',
  '2025-01-01',
  '2025-12-31',
  120,
  15,
  'SF',
  '홍감독',
  '홍배우'
)
RETURNING id;
-- 예: movie_id = 1

-- 6. screening 만들기 (언제 상영하는지)
INSERT INTO screening (
  movie_id, theater_id,
  screening_date, start_time, end_time,
  ticket_price
)
VALUES (
  1,             -- movie_id
  1,             -- theater_id
  '2025-11-20',  -- screening_date
  '2025-11-20 19:30:00',  -- start_time
  '2025-11-20 21:30:00',  -- end_time
  15000
)
RETURNING id;
-- 예: screening_id = 1

-- 7. screening_seat 만들기 (그 상영의 E5 좌석)
INSERT INTO screening_seat (
  screening_id, seat_id, theater_id, is_reserved
)
VALUES (
  1,  -- screening_id
  4,  -- seat_id
  1,  -- theater_id
  TRUE
)
RETURNING id;
-- 예: screening_seat_id = 1

-- 8. 마지막으로 reservation(예매) 만들기
INSERT INTO reservation (
  email,
  screening_seat_id,
  seat_id,
  screening_id,
  theater_id,
  reservation_status
)
VALUES (
  'user@example.com',  -- 이 이메일 기준으로 조회할 거야
  5,                   -- screening_seat_id
  4,                   -- seat_id
  1,                   -- screening_id
  1,                   -- theater_id
  'CONFIRMED'
);
