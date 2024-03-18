import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { UiLoader } from './ui/ui-loader';

export function AuthRoute({ redirectTo }: { redirectTo: string }) {
  //   const { loading, user } = useAuth();
  const user = {
    email: 'las@.gmail.com',
    name: 'Roma'
  };
  let loading = true;
  const location = useLocation();

  setTimeout(() => {
    loading = false;
  }, 1000);

  if (loading) {
    return <UiLoader />;
  }

  return user ? <Outlet /> : <Navigate replace to={redirectTo} state={{ from: location }} />;
}
