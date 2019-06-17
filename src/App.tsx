import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import AuthPage from './pages/AuthPage';
import EventsPage from './pages/EventsPage';
import BookingsPage from './pages/BookingsPage';
import './App.css';
import MainNavigation from './components/navigation/MainNavigation'
import AuthContext from './context/auth-context';

export default class App extends Component{
  state: any;

  constructor(props: any){
      super(props);
      this.state = {
          token: null,
          userId: null,
      }
  }

  login = (token: string, userId: string, tokenExpiration: number) => {
    this.setState({token: token, userId: userId})
  }
  logout = (token: string, userId: string, tokenExpiration: number) => {
    this.setState({token: null, userId: null})
  }
  render(){
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login, 
            logout: this.logout,
          }}>
          <MainNavigation/>
            <main className='main-content'>
              <Switch>
                <Redirect from="/" to="/auth" exact/>
                <Route path="/auth" component={AuthPage}/>
                <Route path="/events" component={EventsPage}/>
                <Route path="/bookings" component={BookingsPage}/>
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }

}
