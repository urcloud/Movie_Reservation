import { Route, Router, Switch } from 'wouter';
import { Home } from './home/home';
import { MovieEdit } from './movies/movie-edit';
import { MoviesList } from './movies/movie-list';
import { MovieRegister } from './movies/movie-register';
import { AppLayout } from './layouts/app-layout';
import { Admin } from './admin/admin-page';
import { LoginForm } from './pages/login';
import { SignupForm } from './pages/signup';
import { TheaterList } from './theaters/theaters-list';
import { TheaterRegister } from './theaters/theater-register';
import { TheaterEdit } from './theaters/theater-edit';
import { TheaterDetail } from './theaters/theater-detail';
import { MovieListPage } from './movielist/movielistpage';
import { MovieDetailPage } from './movielist/movielist-detail';
import { HomeHeader } from './home/home-header';
import { MovieReservation } from './reservations/movie-reservation';
import { MoviePayment } from './reservations/movie-payment';
import { ScreeningInform } from './screening/screening-inform';
import { ScreeningManage } from './screening/screening-manage';
import { ScreeningRegister } from './screening/screening-register';
import { ScreeningEdit } from './screening/screening-edit';
import ReservationsGate from './reservations/reservations';
import ReservationDetailGate from './reservations/reservation-detail';

export const AppRouter = () => {
  return (
    <Router>
      <AppLayout>
        <HomeHeader />
        <Switch>
          <Route path={'/'}>
            <Home />
          </Route>
          <Route path={'/admin'}>
            <Admin />
          </Route>
          <Route path={'/movies'} nest>
            <Switch>
              <Route path={'/'}>
                <MoviesList />
              </Route>
              <Route path={'/edit/:id'}>
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
          <Route path={'/login'} component={LoginForm} />
          <Route path={'/signup'} component={SignupForm} />
          <Route path={'/movielist'}>
            <MovieListPage />
          </Route>
          <Route path={'/movielist/:id'}>
            {(params) => <MovieDetailPage id={params.id} />}
          </Route>
          <Route path={'/booking/:id'}>
            <MovieReservation />
          </Route>
          <Route path='/booking/:id/payment'>
            <MoviePayment />
          </Route>
          <Route path={'/screening'} nest>
            <Switch>
              <Route path={'/'}>
                <ScreeningInform />
              </Route>
              <Route path={'/edit/:id'}>
                <ScreeningEdit />
              </Route>
              <Route path={'/manage/:id'}>
                <ScreeningManage />
              </Route>
              <Route path={'/register/:id'}>
                <ScreeningRegister />
              </Route>
            </Switch>
          </Route>
          <Route path='/reservations'>
            <ReservationsGate />
          </Route>
          <Route path='/reservations/:id'>
            <ReservationDetailGate />
          </Route>
        </Switch>
      </AppLayout>
    </Router>
  );
};
