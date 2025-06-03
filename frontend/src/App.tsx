import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import BlankLayout from './layouts/BlankLayout';

// Pages
import HomePage from './pages/HomePage';
import FeedsPage from './pages/FeedsPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NotificationsPage from './pages/NotificationsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoadingPage from './pages/LoadingPage';
import ErrorPage from './pages/ErrorPage';
import ComponentDemo from './pages/ComponentDemo';

// Shared components
import { AcrylicProvider } from './components/shared';
import { ErrorBoundary } from './components/ui';

// Router configuration với nested routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'feeds',
        element: <FeedsPage />
      },
      {
        path: 'question/:id',
        element: <QuestionDetailPage />
      },
      {
        path: 'notifications',
        element: <NotificationsPage />
      },
      {
        path: 'leaderboard',
        element: <LeaderboardPage />
      },
      {
        path: 'demo',
        element: <ComponentDemo />
      },
      {
        path: 'loading',
        element: <LoadingPage />
      }
    ]
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />
      }
    ]
  },
  {
    path: '/error/:errorCode?',
    element: <ErrorPage />
  },
  {
    path: '*',
    element: <ErrorPage errorCode="404" />
  }
]);

function App() {
  return (
    <ErrorBoundary>
      <AcrylicProvider intensity="medium">
        <RouterProvider router={router} />
      </AcrylicProvider>
    </ErrorBoundary>
  );
}

export default App;
