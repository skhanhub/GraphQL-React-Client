import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css'
export default (props: any) => (
    <header className="main-nav">
        <div className="main-nav-logo">
            <h1>The Navbar</h1>
        </div>
        <nav className="main-nav-items">
            <ul>
                <li><NavLink to="/auth">Authentication</NavLink></li>
                <li><NavLink to="/events">Events</NavLink></li>
                <li><NavLink to="/bookings">Bookings</NavLink></li>
            </ul>
        </nav>
    </header>
)