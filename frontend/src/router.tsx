import { Route, Router, Switch } from 'wouter';
import { Home } from './home/home';
import { MovieEdit } from './movies/movie-edit';
import { MoviesList } from './movies/movie-list';
import { MovieRegister } from './movies/movie-register';
import { AppLayout } from './layouts/app-layout';
import { GuestBooking } from './booking/guest-booking';
import { BookingDetail } from './booking/booking-detail';
import { MovieListPage } from './movielist/movielistpage';
import { MovieDetailPage } from './movielist/movielist-detail';

export const AppRouter = () => {
  return (
    <Router>
      <AppLayout>
        <Switch>
          <Route path={'/'}>
            <Home />
          </Route>
          <Route path={'/movies'} nest>
            <Switch>
              <Route path={'/'}>
                <MoviesList />
              </Route>
              <Route path={'/edit'}>
                <MovieEdit />
              </Route>
              <Route path={'/register'}>
                <MovieRegister />
              </Route>
            </Switch>
          </Route>
          <Route path={'/guest-reservations'}>
            <GuestBooking />
          </Route>
          <Route path={'/guest-reservations/:id'}>
            {(params) => <BookingDetail id={params.id} />}
          </Route>
          <Route path={'/movielist'}>
                <MovieListPage />
              </Route>
              <Route path={'/movielist/:id'}>
  {(params) => <MovieDetailPage id={params.id} />}
</Route>
        </Switch>
      </AppLayout>
    </Router>
  );
};
