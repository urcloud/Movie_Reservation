import { Route, Router, Switch } from 'wouter';
import { Home } from './home/home';
import { MovieEdit } from './movies/movie-edit';
import { MoviesList } from './movies/movie-list';
import { MovieRegister } from './movies/movie-register';
import { AppLayout } from './layouts/app-layout';
import {  GuestReserv } from './reservations/guest-reservation';
import {  GuestReservDetail } from './reservations/guest-res-detail';
import { MemberResrv } from './reservations/mem-reservation';// (예) src/app-layout.tsx
import { MemberReservDetail } from './reservations/mem-res-detail';



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
            <GuestReserv />
          </Route>
          <Route path={'/guest-reservations/:id'}>
            {(params) => <GuestReservDetail id={params.id} />}
          </Route>
          <Route path={'/mem-reservations'}>
            <MemberResrv />
          </Route>
          <Route path="/mem-reservations/:id">
            {(params) => <MemberReservDetail id={params.id} />}
          </Route>
        </Switch>
      </AppLayout>
    </Router>
  );
};
