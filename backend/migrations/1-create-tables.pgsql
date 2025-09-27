-- create tables

-- roles table
CREATE TABLE IF NOT EXISTS roles (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  priority smallint NOT NULL,
  description TEXT
);

-- roles 초기 데이터 삽입
INSERT INTO roles (name, priority, description) VALUES 
  ('admin', 1, 'Administrator'),
  ('user', 100, 'User'),
  ('guest', 1000, 'Guest');

-- users table
CREATE TABLE IF NOT EXISTS users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name VARCHAR(50),
  role_id INTEGER REFERENCES roles (id) NOT NULL,
  created_at timestamp with time zone DEFAULT NOW()
);