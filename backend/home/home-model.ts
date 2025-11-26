export type MovieDTO = {
  id: number,
  title: string,
  description: string,
  genre: string,
  director: string,
  mainActor: string,
  releaseDate: string,
  closeDate: string,
  runningTime: number,
  viewingAge: number
};

export type HomeMovies = MovieDTO[];