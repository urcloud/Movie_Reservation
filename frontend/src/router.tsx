import { Route, Router, Switch } from 'wouter';
import { Home } from './home/home';
import { AppLayout } from './layouts/app-layout';
import { GuestBooking } from './home/guest-booking';
import { BookingDetail } from './home/booking-detail';

export const AppRouter = () => {
  return (
    <Router>
      <AppLayout>
        <Switch>
          <Route path={'/'}>
            <Home />
          </Route>
           <Route path={'/guest-booking'}>
            <GuestBooking />
          </Route>
                  <Route path={'/guest-booking/:id'}>
            {params => <BookingDetail id={params.id} />}
          </Route>
        </Switch>
      </AppLayout>
    </Router>
  );
};
