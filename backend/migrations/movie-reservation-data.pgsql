-- 시퀀스 리셋 (테이블 비워진 상태에서 실행)
ALTER SEQUENCE role_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE movie_id_seq RESTART WITH 1;
ALTER SEQUENCE theater_id_seq RESTART WITH 1;
ALTER SEQUENCE seat_id_seq RESTART WITH 1;
ALTER SEQUENCE screening_id_seq RESTART WITH 1;
ALTER SEQUENCE screening_seat_id_seq RESTART WITH 1;
ALTER SEQUENCE reservation_id_seq RESTART WITH 1;

--mock데이터 삽입
INSERT INTO role (role_name) VALUES
('ADMIN'),
('USER');

INSERT INTO users (email, password, member_name, birthday, role_id)
VALUES
('user1@example.com', 'pw1234', '홍길동', '1990-01-01', 1),
('user2@example.com', 'pw1234', '김철수', '1991-02-02', 2),
('user3@example.com', 'pw1234', '이영희', '1988-03-03', 1),
('user4@example.com', 'pw1234', '박민수', '1995-04-04', 2),
('user5@example.com', 'pw1234', '최다혜', '1992-05-05', 1),
('user6@example.com', 'pw1234', '오지연', '1993-06-06', 2),
('user7@example.com', 'pw1234', '장우진', '1985-07-07', 1),
('user8@example.com', 'pw1234', '서지원', '1989-08-08', 2),
('user9@example.com', 'pw1234', '배성훈', '1994-09-09', 1),
('user10@example.com', 'pw1234', '정은비', '1996-10-10', 2);

INSERT INTO movie (user_email, title, description, release_date, close_date, running_time, viewing_age, genre, director, main_actor)
VALUES
('user1@example.com', '영화1', '설명1', '2024-01-01', '2024-02-01', 120, 12, 'ACTION', '감독1', '배우1'),
('user2@example.com', '영화2', '설명2', '2024-01-05', '2024-02-10', 110, 15, 'DRAMA', '감독2', '배우2'),
('user3@example.com', '영화3', '설명3', '2024-01-10', '2024-03-01', 130, 12, 'SF', '감독3', '배우3'),
('user4@example.com', '영화4', '설명4', '2024-02-01', '2024-03-10', 105, 18, 'ROMANCE', '감독4', '배우4'),
('user5@example.com', '영화5', '설명5', '2024-02-05', '2024-03-20', 140, 12, 'ACTION', '감독5', '배우5'),
('user6@example.com', '영화6', '설명6', '2024-03-01', '2024-04-01', 95, NULL, 'COMEDY', '감독6', '배우6'),
('user7@example.com', '영화7', '설명7', '2024-03-05', '2024-04-10', 115, 12, 'THRILL', '감독7', '배우7'),
('user8@example.com', '영화8', '설명8', '2024-04-01', '2024-05-01', 150, 19, 'DRAMA', '감독8', '배우8'),
('user9@example.com', '영화9', '설명9', '2024-04-10', '2024-05-10', 100, 12, 'ACTION', '감독9', '배우9'),
('user10@example.com', '영화10', '설명10', '2024-05-01', '2024-06-01', 125, NULL, 'SF', '감독10', '배우10'),
('user1@example.com', '현재상영작1', '설명1', '2025-01-01', '2025-12-30', 120, 12, 'ACTION', '감독1', '배우1'),
('user2@example.com', '현재상영작2', '설명2', '2025-01-15', '2025-12-29', 110, 15, 'DRAMA', '감독2', '배우2'),
('user3@example.com', '현재상영작3', '설명3', '2025-01-20', '2025-12-20', 130, 12, 'SF', '감독3', '배우3'),
('user4@example.com', '현재상영작4', '설명4', '2025-01-10', '2025-12-30', 105, 18, 'ROMANCE', '감독4', '배우4'),
('user5@example.com', '현재상영작5', '설명5', '2024-12-20', '2025-12-25', 140, 12, 'ACTION', '감독5', '배우5'),
('user6@example.com', '현재상영작6', '설명6', '2025-01-05', '2025-12-30', 95, NULL, 'COMEDY', '감독6', '배우6'),
('user7@example.com', '현재상영작7', '설명7', '2025-01-02', '2025-12-29', 115, 12, 'THRILL', '감독7', '배우7'),
('user8@example.com', '현재상영작8', '설명8', '2025-01-18', '2025-12-24', 150, 19, 'DRAMA', '감독8', '배우8'),
('user9@example.com', '현재상영작9', '설명9', '2025-01-25', '2025-12-28', 100, 12, 'ACTION', '감독9', '배우9'),
('user10@example.com', '현재상영작10', '설명10', '2025-01-30', '2025-12-27', 125, NULL, 'SF', '감독10', '배우10'),
('user1@example.com', '상영예정작1', '설명1', '2026-02-10', '2026-03-10', 120, 12, 'ACTION', '감독11', '배우11'),
('user2@example.com', '상영예정작2', '설명2', '2026-02-15', '2026-03-20', 110, 15, 'DRAMA', '감독12', '배우12'),
('user3@example.com', '상영예정작3', '설명3', '2026-02-20', '2026-04-01', 130, 12, 'SF', '감독13', '배우13'),
('user4@example.com', '상영예정작4', '설명4', '2026-02-25', '2026-04-05', 105, 18, 'ROMANCE', '감독14', '배우14'),
('user5@example.com', '상영예정작5', '설명5', '2026-03-01', '2026-04-10', 140, 12, 'ACTION', '감독15', '배우15'),
('user6@example.com', '상영예정작6', '설명6', '2026-03-05', '2026-05-01', 95, NULL, 'COMEDY', '감독16', '배우16'),
('user7@example.com', '상영예정작7', '설명7', '2026-03-10', '2026-05-10', 115, 12, 'THRILL', '감독17', '배우17'),
('user8@example.com', '상영예정작8', '설명8', '2026-03-15', '2026-06-01', 150, 19, 'DRAMA', '감독18', '배우18'),
('user9@example.com', '상영예정작9', '설명9', '2026-03-20', '2026-06-10', 100, 12, 'ACTION', '감독19', '배우19'),
('user10@example.com', '상영예정작10', '설명10', '2026-03-25', '2026-06-20', 125, NULL, 'SF', '감독20', '배우20');

INSERT INTO theater (theater_name, total_seats, seat_row, seat_col)
VALUES
('1관', 60, 10, 6),
('2관', 100, 10, 10),
('3관', 80, 10, 8),
('4관', 80, 10, 8),
('5관', 90, 10, 9);

-- Theater 1 (10 rows x 6 cols)
INSERT INTO seat (theater_id, seat_number)
SELECT 1, CONCAT(chr(64 + r), c)
FROM generate_series(1, 10) AS r,
     generate_series(1, 6) AS c;

-- Theater 2 (10 rows x 10 cols)
INSERT INTO seat (theater_id, seat_number)
SELECT 2, CONCAT(chr(64 + r), c)
FROM generate_series(1, 10) AS r,
     generate_series(1, 10) AS c;

-- Theater 3 (10 rows x 8 cols)
INSERT INTO seat (theater_id, seat_number)
SELECT 3, CONCAT(chr(64 + r), c)
FROM generate_series(1, 10) AS r,
     generate_series(1, 8) AS c;

-- Theater 4 (10 rows x 8 cols)
INSERT INTO seat (theater_id, seat_number)
SELECT 4, CONCAT(chr(64 + r), c)
FROM generate_series(1, 10) AS r,
     generate_series(1, 8) AS c;

-- Theater 5 (10 rows x 9 cols)
INSERT INTO seat (theater_id, seat_number)
SELECT 5, CONCAT(chr(64 + r), c)
FROM generate_series(1, 10) AS r,
     generate_series(1, 9) AS c;

INSERT INTO screening (movie_id, theater_id, screening_date, start_time, end_time, ticket_price)
VALUES
(11, 1, '2025-12-01', '10:00:00', '12:00:00', 12000),
(12, 2, '2025-12-01', '12:00:00', '14:00:00', 13000),
(13, 3, '2025-12-01', '14:00:00', '16:00:00', 14000),
(14, 4, '2025-12-01', '16:00:00', '18:00:00', 15000),
(15, 5, '2025-12-01', '18:00:00', '20:00:00', 11000),
(16, 1, '2025-12-02', '10:00:00', '12:00:00', 12000),
(17, 2, '2025-12-02', '12:00:00', '14:00:00', 13000),
(18, 3, '2025-12-02', '14:00:00', '16:00:00', 14000),
(19, 4, '2025-12-02', '16:00:00', '18:00:00', 15000),
(20, 5, '2025-12-02', '18:00:00', '20:00:00', 11000),
(11, 1, '2025-12-03', '10:00:00', '12:00:00', 12000),
(12, 2, '2025-12-03', '12:00:00', '14:00:00', 13000),
(13, 3, '2025-12-03', '14:00:00', '16:00:00', 14000),
(14, 4, '2025-12-03', '16:00:00', '18:00:00', 15000),
(15, 5, '2025-12-03', '18:00:00', '20:00:00', 11000),
(16, 1, '2025-12-04', '10:00:00', '12:00:00', 12000),
(17, 2, '2025-12-04', '12:00:00', '14:00:00', 13000),
(18, 3, '2025-12-04', '14:00:00', '16:00:00', 14000),
(19, 4, '2025-12-04', '16:00:00', '18:00:00', 15000),
(20, 5, '2025-12-04', '18:00:00', '20:00:00', 11000),
(11, 1, '2025-12-05', '10:00:00', '12:00:00', 12000),
(12, 2, '2025-12-05', '12:00:00', '14:00:00', 13000),
(13, 3, '2025-12-05', '14:00:00', '16:00:00', 14000),
(14, 4, '2025-12-05', '16:00:00', '18:00:00', 15000),
(15, 5, '2025-12-05', '18:00:00', '20:00:00', 11000),
(16, 1, '2025-12-06', '10:00:00', '12:00:00', 12000),
(17, 2, '2025-12-06', '12:00:00', '14:00:00', 13000),
(18, 3, '2025-12-06', '14:00:00', '16:00:00', 14000),
(19, 4, '2025-12-06', '16:00:00', '18:00:00', 15000),
(20, 5, '2025-12-06', '18:00:00', '20:00:00', 11000);

INSERT INTO screening_seat (screening_id, seat_id, theater_id, is_reserved)
SELECT s.id, se.id, s.theater_id, FALSE
FROM screening s
JOIN seat se ON s.theater_id = se.theater_id;

-- user1~user10, screening 1~10, 각 screening에서 랜덤 좌석 2~3개 예약
INSERT INTO reservation (email, screening_seat_id, seat_id, screening_id, theater_id)
VALUES
-- screening 1, theater 1
('user1@example.com', 11, 11, 1, 1),
('user1@example.com', 12, 12, 1, 1),
('user2@example.com', 13, 13, 1, 1),

-- screening 2, theater 2
('user2@example.com', 61, 61, 2, 2),
('user2@example.com', 62, 62, 2, 2),
('user3@example.com', 63, 63, 2, 2),

-- screening 3, theater 3
('user3@example.com', 21, 21, 3, 3),
('user4@example.com', 22, 22, 3, 3),
('user5@example.com', 23, 23, 3, 3),

-- screening 4, theater 4
('user4@example.com', 01, 01, 4, 4),
('user5@example.com', 02, 02, 4, 4),
('user6@example.com', 03, 03, 4, 4),

-- screening 5, theater 5
('user6@example.com', 81, 81, 5, 5),
('user7@example.com', 82, 82, 5, 5),
('user8@example.com', 83, 83, 5, 5),

-- screening 6, theater 1
('user7@example.com', 13, 13, 6, 1),
('user8@example.com', 14, 14, 6, 1),
('user9@example.com', 15, 15, 6, 1),

-- screening 7, theater 2
('user8@example.com', 71, 71, 7, 2),
('user9@example.com', 72, 72, 7, 2),
('user10@example.com', 73, 73, 7, 2),

-- screening 8, theater 3
('user1@example.com', 20, 20, 8, 3),
('user2@example.com', 16, 16, 8, 3),
('user3@example.com', 17, 17, 8, 3),

-- screening 9, theater 4
('user4@example.com', 05, 05, 9, 4),
('user5@example.com', 06, 06, 9, 4),
('user6@example.com', 07, 07, 9, 4),

-- screening 10, theater 5
('user7@example.com', 85, 85, 10, 5),
('user8@example.com', 86, 86, 10, 5),
('user9@example.com', 87, 87, 10, 5);