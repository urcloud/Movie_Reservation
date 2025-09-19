import { Route, Router, Switch } from 'wouter';
import { Home } from './home/home';
import { AppLayout } from './layouts/app-layout';
export const AppRouter = () => {
  return (
    <Router>
      <AppLayout>
        <Switch>
          <Route path={'/'}>
            <Home />
          </Route>
        </Switch>
      </AppLayout>
    </Router>
  );
};
