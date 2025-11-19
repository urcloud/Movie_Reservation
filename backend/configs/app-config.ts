const APP_NAME = 'movie_reservation';
export const appConfig = {
  port: 3000,
  dbUri:
    process.env.DB_CONNECTION ||
    `postgresql://test:test@localhost:5432/${APP_NAME}`,
};
