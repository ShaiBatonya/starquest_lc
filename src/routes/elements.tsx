import { lazy, Suspense, ReactNode, ComponentType } from 'react';

const Loadable = <P extends object>(Component: ComponentType<P>) => (props: P): ReactNode => (
  <Suspense fallback={<div>...loading</div>}>
    <Component {...props} />
  </Suspense>
);

export const UserDashboard = Loadable(lazy(() => import('@/pages/public/UserDashboard')));
export const UserQuest = Loadable(lazy(() => import('@/pages/public/UserQuest')));
export const Login = Loadable(lazy(() => import('@/pages/public/Login')));
export const NotFound = Loadable(lazy(() => import('@/pages/public/NotFound')));
export const Register = Loadable(lazy(() => import('@/pages/public/Register')));
export const ForgotPassword = Loadable(lazy(() => import('@/pages/public/ForgotPassword')));
export const DailyReports = Loadable(lazy(() => import('@/pages/public/DailyReports')));
export const Verification = Loadable(lazy(() => import('@/pages/public/Verification')));
export const WeeklyReports = Loadable(lazy(() => import('@/pages/public/WeeklyReports')));
export const EndOfDayReports = Loadable(lazy(() => import('@/pages/public/EndOfDayReports')));
export const LeaderBoard = Loadable(lazy(() => import('@/pages/public/LeaderBoard'))); 
export const MenteesOverview = Loadable(lazy(() => import('@/pages/public/MenteesOverview')));
export const UserProfile = Loadable(lazy(() => import('@/pages/public/UserProfile')));
export const AdminInvite = Loadable(lazy(() => import('@/pages/public/AdminInvite')));
export const AdminBacklog = Loadable(lazy(() => import('@/pages/public/AdminBacklog')));
export const LearningRoadmap = Loadable(lazy(() => import('@/pages/public/LearningRoadmap')));
export const AdminPosition = Loadable(lazy(() => import('@/pages/public/AdminPosition')));
export const MenteesQuests = Loadable(lazy(() => import('@/pages/public/MenteesQuests')));


