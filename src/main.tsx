import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MembersList from './components/MembersList.tsx';
import ErrorPage from './components/ErrorPage.tsx';
import MemberCVPage from './components/MemberCVPage.tsx';
import MemberForm from './components/forms/MemberForm.tsx';
import Layout from './components/Layout.tsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MembersList />,
      },
      {
        path: '/member-form',
        element: <MemberForm />,
      },
      {
        path: '/cv-details/:id/*',
        element: <MemberCVPage />,
      },
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);