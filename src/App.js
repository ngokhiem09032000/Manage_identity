import { LifeBuoy, Settings } from 'lucide-react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from './component/page/LoginPage';
import { Sidebar, SidebarItem } from './component/element/Sidebar';
import HomePage from './component/page/HomePage';
import UserPage from './component/page/User/UserPage';
import { FaHome, FaProductHunt, FaUser, FaUserCog, FaUserLock } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import RolePage from './component/page/Role/RolePage';
import PermissionPage from './component/page/Permission/PermissionPage';
import { checkRole } from './tool/ToolAll';
import ProductPage from './component/page/Product/ProductPage';

function App() {

  // const categorys = ["Home", "Products", "Category", "Contact"];
  // const categoryLinks = ["/Home", "/Product", "/Category", "/Contact"];

  const location = useLocation();
  const isLoginPage = location.pathname === "/"; // Kiểm tra nếu là trang login
  const isRole = checkRole();

  return (
    <div className='App'>
      {!isLoginPage &&
        <>
          <Sidebar>
            <SidebarItem icon={<FaHome size={20} />} text="Home" alert link="/home" />
            {isRole && <SidebarItem icon={<FaUser size={20} />} text="Users" alert link="/user" />}
            {isRole && <SidebarItem icon={<FaUserCog size={20} />} text="Roles" alert link="/role" />}
            {isRole && <SidebarItem icon={<FaUserLock size={20} />} text="Permissions" link="/permission" />}
            {isRole && <SidebarItem icon={<FaProductHunt size={20} />} text="Products" link="/product" />}
            <hr className='my-3'></hr>
            <SidebarItem icon={<Settings size={20} />} text="Settings" link="/home" />
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" link="/home" />
            <SidebarItem icon={<MdLogout size={20} className='-scale-x-100' />} text="Log out" link="/" />
          </Sidebar>
        </>
      }
      <div className={!isLoginPage ? 'absolute z-0 w-full' : ''}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          {isRole && <Route path="/user" element={<UserPage />} />}
          {isRole && <Route path="/role" element={<RolePage />} />}
          {isRole && <Route path="/permission" element={<PermissionPage />} />}
          {isRole && <Route path="/product" element={<ProductPage />} />}
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
