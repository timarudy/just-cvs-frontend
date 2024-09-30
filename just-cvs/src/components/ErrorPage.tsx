import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    const error = useRouteError();

    return (
        <div>
            <h1>Oops! Something went wrong</h1>
            <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
    );
};

export default ErrorPage;
