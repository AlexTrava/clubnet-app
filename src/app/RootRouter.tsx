import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '@/app/layout';
import { RoutersPaths } from '@/shared/types/enums';
import { Spiner } from '@/shared/ui/Loader/Loader';
const MainPage = lazy(() => import('@/pages/MainPage/MainPage'));
const UserPage = lazy(() => import('@/pages/UserPage/UserPage'));
const AuthPage = lazy(() => import('@/pages/AuthPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage/AdminPage'));
const NotFound = lazy(() => import('@/pages/Error-404/Error-404'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage/ProfilePage'));

export default function RootRouter() {
  return (
    <Suspense fallback={<Spiner />}>
      <Routes>
        <Route path={RoutersPaths.LOGIN} element={<AuthPage />} />
        <Route element={<Layout />}>
          <Route path={RoutersPaths.MAIN} element={<MainPage />} />
          <Route path={RoutersPaths.ADMIN} element={<AdminPage />} />
          <Route path={RoutersPaths.PROFILE} element={<ProfilePage />} />
          <Route path={RoutersPaths.USERDETAIL} element={<UserPage />} />
          <Route path={RoutersPaths.NOFOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
