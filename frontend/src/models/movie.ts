export interface Movie {
  id: number; // ERD: movieID LONG
  userId: number; // ERD: userID LONG
  title: string; // ERD: title VARCHAR
  description: string; // ERD: description TEXT
  release_date: string; // ERD: release_date DATE
  close_date: string; // ERD: closeDate DATE
  running_time: number; // ERD: runningTime LONG
  viewing_age: number; // ERD: viewingAge INT
  genre: string; // ERD: genre VARCHAR
  director: string; // ERD: director VARCHAR
  main_actor: string; // ERD: mainActor TEXT
  created_at: string; // ERD: createdAt DATETIME
  modified_at: string; // ERD: modifiedAt DATETIME
}
