// import React from "react";
// import { useNavigate } from "react-router-dom";

// interface LogoutProps {
//   onLogout?: () => void;
// }

// const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Add your logout logic here, e.g., clearing authentication token, etc.
//     // Then navigate to the login page or any desired destination.
//     // For example:
//     // clearAuthenticationToken();
//     if (onLogout) {
//       onLogout();
//     }
//     navigate("/login");
//   };

//   return (
//     <div onClick={handleLogout} className="cursor-pointer">
//       <img src="./src/assets/logout.svg" alt="logout" className="w-6 h-6" />
//       <span className="ml-2">Log out</span>
//     </div>
//   );
// };

// export default Logout;
