import { Route, Router, Switch } from 'wouter';
import { Home } from './home/home';
import { MovieEdit } from './movieinfo/movie-edit';
import { MovieIndex } from './movieinfo/movie-index';
import { MovieRegist } from './movieinfo/movie-inform';

export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={'/'}>
          <Home />
        </Route>
        <Route path={'/movie-edit'}>
          <MovieEdit />
        </Route>
        <Route path={'/movie-index'}>
          <MovieIndex />
        </Route>
        <Route path={'/movie-regist'}>
          <MovieRegist />
        </Route>
      </Switch>
    </Router>
  );
};
