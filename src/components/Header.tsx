import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header>
            <div className="logo">
                <h1>just-cvs</h1>
            </div>
            <nav>
                <Link to="/">all CVs</Link>
                <Link to="/member-form">create CV</Link>
            </nav>
            <div className="header-right">
                <div className="brand-logo">
                    <img src="https://storage.googleapis.com/just-cvs-bucket/users_avatars/logo.png" alt="logo" />
                </div>
            </div>
        </header>
    );
};

export default Header;
