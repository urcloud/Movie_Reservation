# 영화예매 백엔드

## 백엔드 패키지 설치 및 실행

프로젝트를 복제(clone)한 후 처음 실행할 때는 다음과 같은 명령어를 실행해서 필요한 패키지들을 설치하셔야 합니다.

1. `backend` 폴더로 이동

   ```bash
   cd backend
   ```

1. 새로 설치한 모듈이 있을 때 마다 실행

   ```bash
   npm install
   ```

1. 백엔드 서버 실행

   ```bash
   npm run dev
   ```

1. 백엔드 서버를 종료하려면 `CTRL + C` 키를 누르면 됩니다.

## Database 설정

1. [PostgreSQL 내려받기](https://www.postgresql.org/download/) 및 설치
   - 프로그램 설치할 때 `postgres` 계정의 비밀번호를 설정했으면 잘 기억해야 합니다. 그 비밀번호를 계속 사용해야 합니다. 비밀번호를 설정하지 않았으면 상관없습니다.

1. 아래 명령어들은 터미널에서 실행합니다.

1. 다음을 실행하여 `postgres` user로 로그인합니다.

   ```bash
   $ psql -U postgres
   ```

1. 다음을 실행하여 `test` user 생성하고 비밀번호는 `'test'`로 설정합니다.

   ```bash
   postgres=# create user test password 'test';
   ```

1. 다음을 실행하여 `movie_reservation` 데이터베이스 생성합니다.

   ```bash
   postgres=# create database movie_reservation owner test;
   ```

1. 다음을 실행하여 `psql`을 종료합니다.

   ```bash
   postgres=# exit
   ```

1. 백엔드 서버를 다시 실행합니다.
