--ENUM TYPE 정의 
CREATE TYPE reservation_status_enum AS ENUM ('CONFIRMED', 'CANCELED');

--role table 
CREATE TABLE IF NOT EXISTS role ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    role_name VARCHAR(10) NOT NULL UNIQUE );

-- role 초기 데이터 삽입
INSERT INTO role (role_name) VALUES 
  ('admin'),
  ('member');

--users table (user은 예약어라 테이블명 변경 필요)
--role 가진 user가 있을 시 role 삭제 불가 
CREATE TABLE IF NOT EXISTS users ( 
    email VARCHAR(255) PRIMARY KEY, 
    password VARCHAR(255) NOT NULL, 
    member_name VARCHAR(100) NOT NULL, 
    birthday DATE NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
    modified_at TIMESTAMP NULL, 
    role_id INT NOT NULL REFERENCES role(id) ON DELETE RESTRICT ); 

--theater table 
CREATE TABLE IF NOT EXISTS theater ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    theater_name VARCHAR(30) NOT NULL, 
    total_seats INT NOT NULL, 
    seat_row INT NOT NULL, 
    seat_col INT NOT NULL ); 

--seat table 
--theater 삭제 시 seat 데이터도 CASCADE로 삭제 
CREATE TABLE IF NOT EXISTS seat ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    theater_id INT NOT NULL REFERENCES theater(id) ON DELETE CASCADE, 
    seat_number VARCHAR(20) NOT NULL ); 
    
--movie table 
--user 삭제 시 movie는 남아있도록 삭제조건 설정 
CREATE TABLE IF NOT EXISTS movie ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    user_email VARCHAR(255) REFERENCES users(email) ON DELETE SET NULL, 
    title VARCHAR(255) NOT NULL, 
    description TEXT NOT NULL, 
    release_date DATE NOT NULL, 
    close_date DATE NOT NULL, 
    running_time INT NOT NULL, 
    viewing_age INT NULL, 
    genre VARCHAR(10) NOT NULL, 
    director VARCHAR(50) NOT NULL, 
    main_actor TEXT NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
    modified_at TIMESTAMP NULL ); 

--screening table 
--theater나 movie 삭제 시 screening 데이터도 CASCADE로 삭제 
CREATE TABLE IF NOT EXISTS screening (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    movie_id INT NOT NULL REFERENCES movie(id) ON DELETE CASCADE, 
    theater_id INT NOT NULL REFERENCES theater(id) ON DELETE CASCADE, 
    screening_date DATE NOT NULL, 
    start_time TIME NOT NULL, 
    end_time TIME NOT NULL, 
    ticket_price INT NOT NULL );

--screening_seat table 
--theater나 seat 삭제 시 screening_seat 데이터도 CASCADE로 삭제 
CREATE TABLE IF NOT EXISTS screening_seat ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    screening_id INT NOT NULL REFERENCES screening(id) ON DELETE CASCADE, 
    seat_id INT NOT NULL REFERENCES seat(id) ON DELETE CASCADE, 
    theater_id INT NOT NULL REFERENCES theater(id) ON DELETE CASCADE, 
    is_reserved BOOLEAN NOT NULL DEFAULT FALSE );

--reservation table 
--reservation이 존재할 때 seat, screening, user, theater 등 데이터 삭제 불가 
CREATE TABLE IF NOT EXISTS reservation ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    email VARCHAR(255) NOT NULL REFERENCES users(email) ON DELETE RESTRICT, 
    screening_seat_id INT NOT NULL REFERENCES screening_seat(id) ON DELETE RESTRICT, 
    seat_id INT NOT NULL REFERENCES seat(id) ON DELETE RESTRICT, 
    screening_id INT NOT NULL REFERENCES screening(id) ON DELETE RESTRICT, 
    theater_id INT NOT NULL REFERENCES theater(id) ON DELETE RESTRICT, 
    reservation_status reservation_status_enum NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
    modified_at TIMESTAMP NULL ); 

--review table 
--user, theater, seat 삭제 시 리뷰는 남아있도록 삭제조건 설정 
--reservsation, screening 삭제 시 review 데이터도 cascade로 삭제 
CREATE TABLE IF NOT EXISTS review ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    reservation_id INT NOT NULL REFERENCES reservation(id) ON DELETE CASCADE, 
    email VARCHAR(255) REFERENCES users(email) ON DELETE SET NULL, 
    screening_seat_id INT REFERENCES screening_seat(id) ON DELETE SET NULL, 
    screening_id INT REFERENCES screening(id) ON DELETE SET NULL, 
    seat_id INT REFERENCES seat(id) ON DELETE SET NULL, 
    theater_id INT REFERENCES theater(id) ON DELETE SET NULL, 
    star_rating INT NOT NULL CHECK (star_rating BETWEEN 1 AND 5), 
    review_content TEXT NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
    modified_at TIMESTAMP NULL ); 
    
--likes table 
--user 삭제 시 likes 데이터도 cascade로 삭제 
CREATE TABLE IF NOT EXISTS likes ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    user_email VARCHAR(255) NOT NULL REFERENCES users(email) ON DELETE CASCADE, 
    movie_id INT NOT NULL REFERENCES movie(id) ON DELETE CASCADE, 
    created_at TIMESTAMP NOT NULL DEFAULT NOW() ); 


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