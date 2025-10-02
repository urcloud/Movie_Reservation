import { Route, Router, Switch } from 'wouter';
import { Home } from './home/home';
import { AppLayout } from './layouts/app-layout';
import { LoginForm } from './pages/login';
import { SignupForm } from './pages/signup';
import { HomeHeader } from './home/home-header';
export const AppRouter = () => {
  return (
    <Router>
      <AppLayout>
        <Switch>
          <div className='bg white'>
          <HomeHeader/>
          <Route path={'/'} component={Home}/>
          <Route path={'/login'} component={LoginForm}/>
          <Route path={'/signup'} component={SignupForm}/>
          </div>
        </Switch>
      </AppLayout>
    </Router>
  );
};
