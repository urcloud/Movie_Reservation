--ENUM TYPE 정의 
CREATE TYPE reservation_status_enum AS ENUM ('CONFIRMED', 'CANCELED');

--role table 
CREATE TABLE IF NOT EXISTS role ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    role_name VARCHAR(10) NOT NULL UNIQUE );

-- roles 초기 데이터 삽입
INSERT INTO roles (role_name) VALUES 
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
    screening_date DATE NOT NULL, start_time TIME NOT NULL, 
    end_time TIME NOT NULL, ticket_price INT NOT NULL ); 
 
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