import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MembersList from './components/MembersList.tsx';
import ErrorPage from './components/ErrorPage.tsx'

import './index.css';
import MemberCVPage from './components/MemberCVPage.tsx';
import MemberForm from './components/MemberForm.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MembersList />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/member-cv-page',
    element: <MemberCVPage />,
  },
  {
    path: '/member-form',
    element: <MemberForm />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
