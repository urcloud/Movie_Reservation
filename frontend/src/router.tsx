import { Route, Router, Switch } from 'wouter';
import { Home } from './home/home';
import { MovieEdit } from './movies/movie-edit';
import { MoviesList } from './movies/movie-list';
import { MovieRegister } from './movies/movie-register';

export const AppRouter = () => {
  return (
    <Router>
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
      </Switch>
    </Router>
  );
};
