import { Outlet } from 'react-router-dom';
import { useContext } from "react";
import { AuthContextUser } from "@/context/AuthContextUser";
import SideBar from '@/components/UI/sections/SideBar';
import Nav from '@/components/UI//sections/Nav';
const Layout: React.FC = () => {
    // Access user data and login function from AuthContext
    const { user } = useContext(AuthContextUser);

    return (
        <div>
            {user && <SideBar />}
            {user && <Nav />}
            <Outlet />
        </div>
    );
};

export default Layout;
