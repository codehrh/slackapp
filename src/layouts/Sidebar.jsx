import { NavLink } from "react-router-dom";
import './Sidebar.css'; // Ensure you have corresponding CSS for styling

const Sidebar = () => {
  return (
    <div className="sideBarContainer">
      <div className="sidebar-section">
        <NavLink
          to="channels"
          className={({ isActive }) => (isActive ? 'active-link' : 'link')}
        >
          Channels
        </NavLink>
      </div>
      <div className="sidebar-section">
        <NavLink
          to="messages"
          className={({ isActive }) => (isActive ? 'active-link' : 'link')}
        >
          Messages
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;