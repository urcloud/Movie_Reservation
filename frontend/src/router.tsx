import { Route, Router, Switch } from 'wouter';
import { Home } from './home/home';
import { MovieEdit } from './movies/movie-edit';
import { MoviesList } from './movies/movie-list';
import { MovieRegister } from './movies/movie-register';
import { AppLayout } from './layouts/app-layout';
import { GuestBooking } from './booking/guest-booking';
import { BookingDetail } from './booking/guest-booking-detail';
import { MemberBooking } from './booking/member-booking';// (예) src/app-layout.tsx
import { MemberBookingDetail } from './booking/member-booking-detail';



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
          <Route path={'/mem-reservations'}>
            <MemberBooking />
          </Route>
          <Route path="/mem-reservations/:id">
            {(params) => <MemberBookingDetail id={params.id} />}
          </Route>
        </Switch>
      </AppLayout>
    </Router>
  );
};
