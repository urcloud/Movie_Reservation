create table if not EXISTS screenings(
    id INTEGER GENERATED ALWAYS as IDENTITY PRIMARY KEY,
    start_time time not NULL,
    end_time time not NULL

);

create table if not EXISTS theaters(
        id INTEGER GENERATED ALWAYS as IDENTITY PRIMARY KEY,
    name VARCHAR(50) not NULL,
    running_time INTEGER not NULL

);

create table if not EXISTS seats(
    id INTEGER GENERATED ALWAYS as IDENTITY PRIMARY Key,
    seat_number VARCHAR(50) not NULL 
);

create table if not EXISTS reservations(
    id INTEGER GENERATED ALWAYS as IDENTITY PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    screening_id INTEGER references screenings (id) not NULL,
    seat_id INTEGER references seats (id) not NULL,
    theater_id INTEGER references theaters (id)not NULL
);

INSERT into seats(seat_number) VALUES
('C4');

INSERT into screenings (  start_time, end_time) VALUES
('09:12','12:10');

INSERT into theaters(  name, running_time) VALUES
( '8관', 180);

INSERT into reservations ( email, screening_id,  theater_id, seat_id) VALUES
( 'user@example.com', 1, 1,1);