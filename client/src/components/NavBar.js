import React from 'react';
import {NavLink} from 'react-router-dom';

export const NavBar = () => {
    return (
        <nav>
            <div className="nav-wrapper blue-grey darken-1" style={{ padding: '0 2rem' }}>
                <span className="brand-logo">MyCourses</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/users">Users</NavLink></li>
                    <li><NavLink to="/courses">Courses</NavLink></li>
                </ul>
            </div>
        </nav>
    )
};