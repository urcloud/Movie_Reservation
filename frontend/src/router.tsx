import { Route, Router, Switch } from 'wouter';
import { Home } from './home/home';
import { MovieEdit } from './movies/movie-edit';
import { MoviesList } from './movies/movie-list';
import { MovieRegister } from './movies/movie-register';
import { AppLayout } from './layouts/app-layout';
import { GuestBooking } from './booking/guest-booking';
import { BookingDetail } from './booking/booking-detail';


import { TheaterList } from './theaters/theaters-list';
import { TheaterRegister } from './theaters/theater-register';
import { TheaterEdit } from './theaters/theater-edit';
import { TheaterDetail } from './theaters/theater-detail';


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
          <Route path='/theaters' nest>
            <Switch>
              <Route path='/'>
                <TheaterList />
              </Route>
              <Route path='/register'>
                <TheaterRegister />
              </Route>
              <Route path='/edit/:id'>
                <TheaterEdit />
              </Route>
              <Route path='/:id'>
                <TheaterDetail />
              </Route>
            </Switch>
          </Route>
          <Route path={'/guest-reservations'}>
            <GuestBooking />
          </Route>
          <Route path={'/guest-reservations/:id'}>
            {(params) => <BookingDetail id={params.id} />}
          </Route>
        </Switch>
      </AppLayout>
    </Router>
  );
};
