// Import necessary components and libraries.

import { UserQuest, UserDashboard, Login, Register, ForgotPassword, NotFound, DailyReports, WeeklyReports, EndOfDayReports, Verification, LeaderBoard, MenteesOverview, UserProfile, AdminInvite, AdminBacklog, LearningRoadmap,AdminPosition,MenteesQuests } from './elements';



import Layout from '@/Layout/Layout';

import { AuthContextUser } from "@/context/AuthContextUser";
import { useContext } from "react";
import { useRoutes } from 'react-router-dom';
import { paths } from '@/routes/paths';

// Router component responsible for rendering different components based on the user's authentication status.
const Router: React.FC = (): JSX.Element => {
  // Retrieve user information from the AuthContextUser context.
  const { user } = useContext(AuthContextUser);

  // Define the routes and their corresponding components.
  const routes = [
    {
      path: paths.UserDashboard,
      element: <Layout />,
      children: [
        {
          path: paths.UserDashboard,
          element: user ? <UserDashboard /> : <Login />, // Render Home only if the user is authenticated
        },
        {
          path: paths.UserQuest,
          element: user ? <UserQuest /> : <Login />,
        },
        {
          path: paths.DailyReports,
          element: user ? <DailyReports /> : <Login />,
        },
        {
          path: paths.WeeklyReports,
          element: user ? <WeeklyReports /> : <Login />,
        },
        {
          path: paths.EndOfDayReports,
          element: user ? <EndOfDayReports /> : <Login />,
        },
        {
          path: paths.MenteesOverview,
          element: user ? <MenteesOverview /> : <Login />,
        },
        {
          path: paths.LeaderBoard,
          element: user ? <LeaderBoard /> : <Login />,
        },
        {
          path: paths.register,
          element: user ? <UserDashboard /> : <Register />,
        },
        {
          path: paths.login,
          element: user ? <UserDashboard /> : <Login />,
        },
        {
          path: paths.verification,
          element: user ? <UserDashboard /> : <Verification />,
        },
        {
          path: paths.forgotpassword,
          element: user ? <UserDashboard /> : <ForgotPassword />,
        },
        {

          path: paths.UserProfile,
          element: user ? <UserProfile /> : <Login />,
        },
        {
          path: paths.AdminInvite,
          element: user ? <AdminInvite /> : <Login />,
        },
        {
          path: paths.AdminBacklog,
          element: user ? <AdminBacklog /> : <Login />,
        },
        {
          path: paths.LearningRoadmap,
          element: user ? <LearningRoadmap /> : <Login />,
         
        },
        {
          path: paths.AdminPosition,
          element: user ? <AdminPosition /> : <Login />,
         
        },
        {

          path: paths.MenteesQuests,
          element: user ? <MenteesQuests /> : <Login />,
        },
        

        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ];

  // Render the defined routes using useRoutes.
  return <>{useRoutes(routes)}</>;
};

// Export the Router component as the default export.
export default Router;
