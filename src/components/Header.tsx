import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

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
            <h3>
                <img src="https://storage.googleapis.com/just-cvs-bucket/users_avatars/logo.png" width={70} height={70} alt="logo" />
            </h3>
        </header>
    );
};

export default Header;
