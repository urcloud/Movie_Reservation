export interface Movie {
  id: number; // ERD: movieID LONG
  userId: number; // ERD: userID LONG
  title: string; // ERD: title VARCHAR
  description: string; // ERD: description TEXT
  releaseDate: string; // ERD: release_date DATE
  closeDate: string; // ERD: closeDate DATE
  runningTime: number; // ERD: runningTime LONG
  viewingAge: number; // ERD: viewingAge INT
  genre: string; // ERD: genre VARCHAR
  director: string; // ERD: director VARCHAR
  mainActor: string; // ERD: mainActor TEXT
  createdAt: string; // ERD: createdAt DATETIME
  modifiedAt: string; // ERD: modifiedAt DATETIME
}
