import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import AuthPage from './pages/AuthPage';
import EventsPage from './pages/EventsPage';
import BookingsPage from './pages/BookingsPage';
import './App.css';
import MainNavigation from './components/navigation/MainNavigation'

function App() {
  return (
    <BrowserRouter>
    <React.Fragment>
      <MainNavigation/>
        <main className='main-content'>
          <Switch>
            <Redirect from="/" to="/auth" exact/>
            <Route path="/auth" component={AuthPage}/>
            <Route path="/events" component={EventsPage}/>
            <Route path="/bookings" component={BookingsPage}/>
          </Switch>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
