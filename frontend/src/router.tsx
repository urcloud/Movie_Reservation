import { Route, Router, Switch } from 'wouter';
import { Home } from './home/home';
<<<<<<< HEAD
import { MovieEdit } from './home/movie-edit';
import { MovieIndex } from './home/movie-index';
import { MovieRegist } from './home/movie-inform';

export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={'/'}>
          <Home />
        </Route>
        <Route path={'/home/movie-edit'}>
          <MovieEdit />
        </Route>
        <Route path={'/home/movie-index'}>
          <MovieIndex />
        </Route>
        <Route path={'/home/movie-regist'}>
          <MovieRegist />
        </Route>
      </Switch>
=======
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
>>>>>>> main
    </Router>
  );
};
