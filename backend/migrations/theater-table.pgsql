-- 상영관 테이블
CREATE TABLE IF NOT EXISTS theater (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    theater_name VARCHAR(30) NOT NULL,
    total_seats INT NOT NULL,
    seat_row INT NOT NULL,
    seat_col INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    modified_at TIMESTAMP
);

-- 좌석 테이블 (상영관 지워지면 같이 지워짐: ON DELETE CASCADE)
CREATE TABLE IF NOT EXISTS seat (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    theater_id INT NOT NULL REFERENCES theater(id) ON DELETE CASCADE,
    seat_number VARCHAR(20) NOT NULL
);