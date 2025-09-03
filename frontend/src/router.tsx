import { Route, Router, Switch } from 'wouter';
import { Home } from './home/home';
export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={'/'}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
