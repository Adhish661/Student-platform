// // // frontend/src/components/Layout/Header.jsx
// // import { motion } from "framer-motion";
// // import { useLocation } from "react-router-dom";
// // import { FaUser, FaBell, FaSearch } from "react-icons/fa";

// // export default function Header() {
// //   const location = useLocation();

// //   // Function to map path to page title
// //   const getPageTitle = () => {
// //     switch (location.pathname) {
// //       case "/": return "Home";
// //       case "/group-study": return "Group Study";
// //       case "/resources": return "Resources";
// //       case "/previous-year": return "Previous Year Questions";
// //       case "/video-notes": return "Video Notes Generator";
// //       case "/chatbot": return "AI Assistant";
// //       default: return "";
// //     }
// //   };

// //   return (
// //     <motion.header
// //       initial={{ y: -120, opacity: 0 }}
// //       animate={{ y: 0, opacity: 1 }}
// //       transition={{ duration: 0.6, type: "spring", stiffness: 130 }}
// //       className="fixed top-0 left-0 w-full h-[9%] z-50 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 shadow-lg backdrop-blur-md"
// //     >
// //       <div className="h-full px-6 flex justify-between items-center">
// //         {/* Left section: Search + Page Title */}
// //         <div className="flex items-center space-x-6">
// //           {/* Search Bar */}
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.85 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ delay: 0.2, duration: 0.5 }}
// //             className="relative"
// //           >
// //             <input
// //               type="text"
// //               placeholder="Search..."
// //               className="pl-10 pr-4 py-2 w-64 sm:w-48 md:w-64 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 focus:w-80"
// //             />
// //             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
// //           </motion.div>

// //           {/* Page Title */}
// //           <motion.h1
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ delay: 0.35, duration: 0.5 }}
// //             className="text-white font-semibold text-lg md:text-xl select-none"
// //           >
// //             {getPageTitle()}
// //           </motion.h1>
// //         </div>

// //         {/* Right section: Notifications + User */}
// //         <div className="flex items-center space-x-4 md:space-x-6">
// //           {/* Notifications */}
// //           <motion.div
// //             whileHover={{ scale: 1.15 }}
// //             whileTap={{ scale: 0.95 }}
// //             className="relative cursor-pointer p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
// //           >
// //             <FaBell className="text-white text-xl" />
// //             <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
// //               3
// //             </span>
// //           </motion.div>

// //           {/* User Profile */}
// //           <motion.div
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //             className="flex items-center space-x-2 cursor-pointer bg-white/10 px-3 py-2 rounded-lg border border-white/20 transition-all duration-300"
// //           >
// //             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-md">
// //               <FaUser className="text-white text-sm" />
// //             </div>
// //             <span className="text-white text-sm font-medium">Student</span>
// //           </motion.div>
// //         </div>
// //       </div>
// //     </motion.header>
// //   );
// // }
// // // frontend/src/components/Layout/Header.jsx
// import { motion } from "framer-motion";
// import { Link, useLocation } from "react-router-dom";
// import { FaUsers, FaBook, FaHistory, FaVideo, FaRobot, FaHome, FaUser, FaBell, FaSearch } from "react-icons/fa";

// export default function Navbar() {
//   const location = useLocation();

//   const links = [
//     { name: "Home", path: "/", icon: <FaHome /> },
//     { name: "Group Study", path: "/group-study", icon: <FaUsers /> },
//     { name: "Resources", path: "/resources", icon: <FaBook /> },
//     { name: "Previous Year", path: "/previous-year", icon: <FaHistory /> },
//     { name: "Video Notes", path: "/video-notes", icon: <FaVideo /> },
//     { name: "AI Chatbot", path: "/chatbot", icon: <FaRobot /> },
//   ];

//   return (
//     <motion.nav
//       initial={{ y: -120, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, type: "spring", stiffness: 130 }}
//       className="fixed top-0 left-0 w-full h-16 z-50 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 shadow-lg backdrop-blur-md px-8 flex justify-between items-center"
//     >
//       {/* Left: Logo */}
//       <motion.div
//         className="text-2xl font-bold text-white cursor-pointer"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         StuD
//       </motion.div>

//       {/* Center: Navigation Links */}
//       <ul className="flex justify-center items-center space-x-6">
//         {links.map((link, idx) => {
//           const isActive = location.pathname === link.path;
//           return (
//             <motion.li
//               key={idx}
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: idx * 0.05 }}
//             >
//               <Link
//                 to={link.path}
//                 className={`flex flex-col items-center justify-center py-2 px-3 rounded transition-all duration-200 ${
//                   isActive ? "bg-indigo-800" : "hover:bg-indigo-600"
//                 }`}
//               >
//                 <motion.div whileHover={{ scale: 1.2 }} className="text-xl mb-1">
//                   {link.icon}
//                 </motion.div>
//                 <motion.span whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }} className="text-white text-sm">
//                   {link.name}
//                 </motion.span>
//               </Link>
//             </motion.li>
//           );
//         })}
//       </ul>

//       {/* Right: Search + Notifications + User */}
//       <div className="flex items-center space-x-4 md:space-x-6">
//         {/* Search */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.85 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//           className="relative"
//         >
//           <input
//             type="text"
//             placeholder="Search..."
//             className="pl-10 pr-4 py-1.5 w-48 sm:w-64 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 focus:w-72"
//           />
//           <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
//         </motion.div>

//         {/* Notifications */}
//         <motion.div
//           whileHover={{ scale: 1.15 }}
//           whileTap={{ scale: 0.95 }}
//           className="relative cursor-pointer p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
//         >
//           <FaBell className="text-white text-xl" />
//           <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
//             3
//           </span>
//         </motion.div>

//         {/* User */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="flex items-center space-x-2 cursor-pointer bg-white/10 px-3 py-2 rounded-lg border border-white/20 transition-all duration-300"
//         >
//           <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-md">
//             <FaUser className="text-white text-sm" />
//           </div>
//           <span className="text-white text-sm font-medium">Student</span>
//         </motion.div>
//       </div>
//     </motion.nav>
//   );
// }
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaUsers, FaBook, FaVideo, FaRobot, FaHome } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Group Study", path: "/group-study", icon: <FaUsers /> },
    { name: "Video Notes", path: "/video-notes", icon: <FaVideo /> },
    { name: "Resources", path: "/resources", icon: <FaBook /> },
    { name: "AI Chatbot", path: "/chatbot", icon: <FaRobot /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      className="fixed top-0 left-0 w-full h-16 z-50 bg-indigo-700 text-white shadow-md backdrop-blur-md px-8 flex items-center justify-between"
    >
      {/* Left: Logo */}
      <div className="logo" >StuD</div>

      {/* Right: Navigation Links */}
      <ul className="flex items-center gap-6 m-0 p-0 list-none">
        {links.map((link, idx) => {
          const isActive = location.pathname === link.path;
          return (
            <motion.li
              key={idx}
              className="flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
           <Link
              to={link.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive ? "active" : ""
              }`}
            >
                <div className="icon">{link.icon}</div>
                <span>{link.name}</span>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
