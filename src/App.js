import { BarChart3, Boxes, LayoutDashboard, LifeBuoy, Package, Receipt, Settings, UserCircle } from 'lucide-react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from './component/page/LoginPage';
import { Sidebar, SidebarItem } from './component/element/Sidebar';
import HomePage from './component/page/HomePage';
import UserPage from './component/page/User/UserPage';
import { FaHome, FaUser, FaUserCog, FaUserLock } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import RolePage from './component/page/Role/RolePage';
import PermissionPage from './component/page/Permission/PermissionPage';

function App() {

  // const categorys = ["Home", "Products", "Category", "Contact"];
  // const categoryLinks = ["/Home", "/Product", "/Category", "/Contact"];

  const location = useLocation();
  const isLoginPage = location.pathname === "/"; // Kiểm tra nếu là trang login

  return (
    <div className='App'>
      {!isLoginPage &&
        <>
          <Sidebar>
            <SidebarItem icon={<FaHome size={20} />} text="Home" alert link="/home" />
            <SidebarItem icon={<FaUser size={20} />} text="Users" alert link="/user" />
            <SidebarItem icon={<FaUserCog size={20} />} text="Roles" alert link="/role" />
            <SidebarItem icon={<FaUserLock size={20} />} text="Permission" link="/permission" />
            <SidebarItem icon={<Package size={20} />} text="Orders" alert link="/user" />
            <SidebarItem icon={<Receipt size={20} />} text="Billings" link="/user" />
            <hr className='my-3'></hr>
            <SidebarItem icon={<Settings size={20} />} text="Settings" link="/user" />
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" link="/user" />
            <SidebarItem icon={<MdLogout size={20} className='-scale-x-100' />} text="Log out" link="/" />
          </Sidebar>
        </>
      }
      <div className={!isLoginPage ? 'absolute z-0 w-full' : ''}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/role" element={<RolePage />} />
          <Route path="/permission" element={<PermissionPage />} />
        </Routes>
      </div>

    </div>
  );
}

const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
