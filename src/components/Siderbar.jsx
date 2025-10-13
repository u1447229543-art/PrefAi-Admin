import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  Circle,
  ChevronDown,
} from "lucide-react";
import CustomButton from "./CustomButton";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Sections array
  const sections = [
    { name: "User", href: "/admin/user" },
    { name: "Document", href: "/admin/document" },
  ];

  // Check if a route is active
  const isActive = (path) => location.pathname === path;

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logged out successfully");
  };

  // Sidebar Navigation Item Component
  const NavItem = ({
    icon: Icon,
    label,
    href,
    isDropdown = false,
    children,
  }) => {
    const active = isActive(href);

    const itemContent = (
      <div
        className={`
        flex items-center justify-between p-3 rounded-lg transition-colors duration-200
        ${active ? "bg-[#170048] text-white " : "hover:bg-gray-100"}
        ${isOpen ? "w-full" : "justify-center"}
      `}
      >
        <div className="flex items-center space-x-3">
          <Icon
            className={`
            ${isOpen ? "mr-3" : ""}
            ${active ? "text-white" : "text-black"}
          `}
            size={20}
          />
          {isOpen && <span className="font-medium">{label}</span>}
        </div>

        {isOpen && isDropdown && (
          <ChevronDown
            size={16}
            className={`
              transition-transform 
              ${isDropdownOpen ? "rotate-180" : ""}
            `}
          />
        )}
      </div>
    );

    // If it's a dropdown item
    if (isDropdown) {
      return (
        <div>
          <button onClick={toggleDropdown} className="w-full text-left">
            {itemContent}
          </button>

          {isDropdownOpen && isOpen && (
            <div className="pl-4 mt-2 space-y-2">{children}</div>
          )}
        </div>
      );
    }

    // Regular navigation item
    return (
      <Link to={href} className="block w-full">
        {itemContent}
      </Link>
    );
  };

  // Dropdown Subitem Component
  const SubNavItem = ({ href, label }) => {
    const active = isActive(href);

    return (
      <Link
        to={href}
        className={`
          flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200
          ${
            active
              ? "text-white bg-[#170048]"
              : "hover:bg-[#170048] hover:text-white"
          }
        `}
      >
        <Circle
          size={10}
          className={`
            ${active ? "text-white fill-white" : "text-black"}
          `}
        />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div
      className={`
        fixed top-0 left-0 bottom-0 z-50 bg-white shadow-lg 
        bg-gradient-to-t from-[#dcc9f9] to-[#ffc2cd]
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-72" : "w-20"}
         overflow-hidden
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4  h-16">
        {isOpen ? (
          <div className="flex items-center space-x-3 mt-2">
            <img src={`https://res.cloudinary.com/deaezftpx/image/upload/v1760396526/Frame_410_tqamkz.png`} alt="Logo" width={60} />
            <span className="text-lg font-bold text-gray-800">PREFAI</span>
          </div>
        ) : (
          <>
            {/* // <img
          //   src="https://via.placeholder.com/40"
          //   alt="Logo"
          //   className="rounded-full w-10 h-10 mx-auto"
              // /> */}
            <span className="h-6 w-6 bg-black text-white rounded-full flex justify-center">
              P
            </span>
          </>
        )}

        {/* Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="text-[#170048] hover:text-[#17004894] transition-colors"
        >
          {isOpen ? <ChevronsLeft size={24} /> : <ChevronsRight size={24} />}
        </button>
      </div>
      <hr className="mt-2 w-[90%] m-auto border-t-1 border-[#17004858]" />

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        <NavItem icon={Home} label="Dashboard" href="/" isDropdown>
          {sections.map((section, index) => (
            <SubNavItem key={index} href={section.href} label={section.name} />
          ))}
        </NavItem>

        {/* <NavItem icon={Settings} label="Settings" href="/setting" /> */}
      </nav>
      <CustomButton
        onClick={logout}
        disabled={false}
        className={`absolute bottom-4 ${
          isOpen ? "w-[250px] left-4" : "left-2"
        } mt-1 h-[45px] bg-[#170048]`}
      >
        {isOpen && "Logout"}
        <LogOut className="ml-2" />
      </CustomButton>
    </div>
  );
};

export default Sidebar;
