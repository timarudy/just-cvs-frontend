import { Outlet } from 'react-router-dom';

import React from 'react';
import Header from './just-cvs-frontend/src/css/components/Header.css';

const Layout: React.FC = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
