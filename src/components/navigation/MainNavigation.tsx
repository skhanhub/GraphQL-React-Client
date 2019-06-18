import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import './MainNavigation.css'

export default (props: any) => (
    <AuthContext.Consumer>
        {(context: any)=>{
            return (
                <header className="main-nav">
                <div className="main-nav-logo">
                    <h1>The Navbar</h1>
                </div>
                <nav className="main-nav-items">
                    <ul>
                        {!context.token && <li><NavLink to="/auth">Authentication</NavLink></li>}
                        <li><NavLink to="/events">Events</NavLink></li>
                        {context.token && (
                        <React.Fragment>
                            <li><NavLink to="/bookings">Bookings</NavLink></li>
                            <li><NavLink to="/logout" onClick={context.logout}>Logout</NavLink></li>
                        </React.Fragment>
                        )}
                    </ul>
                </nav>
                </header>
            )
        }}
    </AuthContext.Consumer>
)